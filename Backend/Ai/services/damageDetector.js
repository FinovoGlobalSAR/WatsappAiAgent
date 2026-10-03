import * as ort from "onnxruntime-node";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL_PATH = path.join(
  __dirname,
  "../models/best.onnx"
);

const INPUT_SIZE = 640;

const CONFIDENCE_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.45;

const NUM_PREDICTIONS = 8400;
const NUM_CLASSES = 6;
const NUM_MASK_COEFFICIENTS = 32;

const PROTO_WIDTH = 160;
const PROTO_HEIGHT = 160;

// --------------------------------------------------
// Class names
// --------------------------------------------------

const classNames = {
  0: "crack",
  1: "dent",
  2: "glass shatter",
  3: "lamp broken",
  4: "scratch",
  5: "tire flat",
};

let session = null;

// --------------------------------------------------
// Load model once
// --------------------------------------------------

async function loadModel() {
  if (!session) {
    console.log("Loading damage detection model...");

    session = await ort.InferenceSession.create(
      MODEL_PATH,
      {
        executionProviders: ["cpu"],
      }
    );

    console.log("Damage detection model loaded!");
  }

  return session;
}

// --------------------------------------------------
// Calculate IoU
// --------------------------------------------------

function calculateIoU(boxA, boxB) {
  const x1 = Math.max(
    boxA.x1,
    boxB.x1
  );

  const y1 = Math.max(
    boxA.y1,
    boxB.y1
  );

  const x2 = Math.min(
    boxA.x2,
    boxB.x2
  );

  const y2 = Math.min(
    boxA.y2,
    boxB.y2
  );

  const intersectionWidth =
    Math.max(0, x2 - x1);

  const intersectionHeight =
    Math.max(0, y2 - y1);

  const intersectionArea =
    intersectionWidth *
    intersectionHeight;

  const areaA =
    Math.max(
      0,
      boxA.x2 - boxA.x1
    ) *
    Math.max(
      0,
      boxA.y2 - boxA.y1
    );

  const areaB =
    Math.max(
      0,
      boxB.x2 - boxB.x1
    ) *
    Math.max(
      0,
      boxB.y2 - boxB.y1
    );

  const unionArea =
    areaA +
    areaB -
    intersectionArea;

  if (unionArea <= 0) {
    return 0;
  }

  return (
    intersectionArea /
    unionArea
  );
}

// --------------------------------------------------
// Create letterbox image
// --------------------------------------------------

async function createLetterboxImage(
  imagePath
) {
  const metadata =
    await sharp(imagePath).metadata();

  const originalWidth =
    metadata.width;

  const originalHeight =
    metadata.height;

  if (
    !originalWidth ||
    !originalHeight
  ) {
    throw new Error(
      "Unable to read image dimensions"
    );
  }

  const scale = Math.min(
    INPUT_SIZE / originalWidth,
    INPUT_SIZE / originalHeight
  );

  const resizedWidth =
    Math.round(
      originalWidth * scale
    );

  const resizedHeight =
    Math.round(
      originalHeight * scale
    );

  const paddingX = Math.floor(
    (INPUT_SIZE - resizedWidth) / 2
  );

  const paddingY = Math.floor(
    (INPUT_SIZE - resizedHeight) / 2
  );

  const resizedImage =
    await sharp(imagePath)
      .resize(
        resizedWidth,
        resizedHeight,
        {
          fit: "fill",
          kernel: sharp.kernel.cubic,
        }
      )
      .removeAlpha()
      .raw()
      .toBuffer();

  const channels = 3;

  const canvas = Buffer.alloc(
    INPUT_SIZE *
      INPUT_SIZE *
      channels,
    114
  );

  for (
    let y = 0;
    y < resizedHeight;
    y++
  ) {
    const sourceStart =
      y *
      resizedWidth *
      channels;

    const targetStart =
      (
        (y + paddingY) *
          INPUT_SIZE +
        paddingX
      ) *
      channels;

    resizedImage.copy(
      canvas,
      targetStart,
      sourceStart,
      sourceStart +
        resizedWidth *
          channels
    );
  }

  return {
    data: canvas,
    originalWidth,
    originalHeight,
    scale,
    paddingX,
    paddingY,
  };
}

// --------------------------------------------------
// Convert HWC RGB → CHW Float32
// --------------------------------------------------

function createTensorData(
  imageData
) {
  const {
    data,
  } = imageData;

  const pixelCount =
    INPUT_SIZE *
    INPUT_SIZE;

  const tensorData =
    new Float32Array(
      3 * pixelCount
    );

  const redOffset = 0;

  const greenOffset =
    pixelCount;

  const blueOffset =
    pixelCount * 2;

  for (
    let i = 0;
    i < pixelCount;
    i++
  ) {
    const pixelIndex =
      i * 3;

    tensorData[
      redOffset + i
    ] =
      data[pixelIndex] /
      255;

    tensorData[
      greenOffset + i
    ] =
      data[pixelIndex + 1] /
      255;

    tensorData[
      blueOffset + i
    ] =
      data[pixelIndex + 2] /
      255;
  }

  return tensorData;
}

// --------------------------------------------------
// Convert model box → original image
// --------------------------------------------------

function convertBoxToOriginalImage(
  box,
  imageData
) {
  const {
    originalWidth,
    originalHeight,
    scale,
    paddingX,
    paddingY,
  } = imageData;

  let x1 =
    (box.x1 - paddingX) /
    scale;

  let y1 =
    (box.y1 - paddingY) /
    scale;

  let x2 =
    (box.x2 - paddingX) /
    scale;

  let y2 =
    (box.y2 - paddingY) /
    scale;

  x1 = Math.max(
    0,
    Math.min(
      x1,
      originalWidth
    )
  );

  y1 = Math.max(
    0,
    Math.min(
      y1,
      originalHeight
    )
  );

  x2 = Math.max(
    0,
    Math.min(
      x2,
      originalWidth
    )
  );

  y2 = Math.max(
    0,
    Math.min(
      y2,
      originalHeight
    )
  );

  return {
    x1,
    y1,
    x2,
    y2,
  };
}

// --------------------------------------------------
// Class-specific NMS
// --------------------------------------------------

function applyNMS(
  detections
) {
  const sorted = [
    ...detections,
  ].sort(
    (a, b) =>
      b.confidence -
      a.confidence
  );

  const selected = [];

  while (
    sorted.length > 0
  ) {
    const current =
      sorted.shift();

    selected.push(current);

    for (
      let i =
        sorted.length - 1;
      i >= 0;
      i--
    ) {
      const other =
        sorted[i];

      if (
        current.classId ===
        other.classId
      ) {
        const iou =
          calculateIoU(
            current.boundingBox,
            other.boundingBox
          );

        if (
          iou >
          IOU_THRESHOLD
        ) {
          sorted.splice(i, 1);
        }
      }
    }
  }

  return selected;
}

// --------------------------------------------------
// Sigmoid
// --------------------------------------------------

function sigmoid(value) {
  return (
    1 /
    (1 + Math.exp(-value))
  );
}

// --------------------------------------------------
// Generate segmentation mask
// --------------------------------------------------


function generateMask(
  maskCoefficients,
  prototypeData,
  boundingBox,
  originalWidth,
  originalHeight,
  scale,
  paddingX,
  paddingY
) {
  const maskWidth = PROTO_WIDTH;
  const maskHeight = PROTO_HEIGHT;

  const mask = new Uint8Array(
    originalWidth * originalHeight
  );

  const threshold = 0.5;

  // Convert original-image bounding box
  // back to 640x640 model coordinates.
  const modelBox = {
    x1: boundingBox.x1 * scale + paddingX,
    y1: boundingBox.y1 * scale + paddingY,
    x2: boundingBox.x2 * scale + paddingX,
    y2: boundingBox.y2 * scale + paddingY
  };

  // Clamp box to model input dimensions.
  modelBox.x1 = Math.max(
    0,
    Math.min(INPUT_SIZE, modelBox.x1)
  );

  modelBox.y1 = Math.max(
    0,
    Math.min(INPUT_SIZE, modelBox.y1)
  );

  modelBox.x2 = Math.max(
    0,
    Math.min(INPUT_SIZE, modelBox.x2)
  );

  modelBox.y2 = Math.max(
    0,
    Math.min(INPUT_SIZE, modelBox.y2)
  );

  // Generate mask only inside detection box.
  for (let y = 0; y < originalHeight; y++) {
    for (let x = 0; x < originalWidth; x++) {

      // Original image coordinate
      const modelX =
        x * scale + paddingX;

      const modelY =
        y * scale + paddingY;

      // Keep mask restricted to detection box.
      if (
        modelX < modelBox.x1 ||
        modelX > modelBox.x2 ||
        modelY < modelBox.y1 ||
        modelY > modelBox.y2
      ) {
        continue;
      }

      // Convert 640x640 coordinate
      // to 160x160 prototype coordinate.
      const protoX = Math.min(
        maskWidth - 1,
        Math.max(
          0,
          Math.floor(
            (modelX / INPUT_SIZE) *
              maskWidth
          )
        )
      );

      const protoY = Math.min(
        maskHeight - 1,
        Math.max(
          0,
          Math.floor(
            (modelY / INPUT_SIZE) *
              maskHeight
          )
        )
      );

      let maskValue = 0;

      for (
        let coefficient = 0;
        coefficient < NUM_MASK_COEFFICIENTS;
        coefficient++
      ) {
        const protoIndex =
          coefficient *
            maskWidth *
            maskHeight +
          protoY * maskWidth +
          protoX;

        maskValue +=
          maskCoefficients[coefficient] *
          prototypeData[protoIndex];
      }

      const probability =
        sigmoid(maskValue);

      if (probability >= threshold) {
        mask[
          y * originalWidth + x
        ] = 255;
      }
    }
  }

  return mask;
}

// --------------------------------------------------
// Calculate mask area
// --------------------------------------------------

function calculateMaskAreaPercentage(
  mask,
  originalWidth,
  originalHeight
) {
  let maskPixels = 0;

  for (
    let i = 0;
    i < mask.length;
    i++
  ) {
    if (mask[i] > 0) {
      maskPixels++;
    }
  }

  const imagePixels =
    originalWidth *
    originalHeight;

  return (
    (maskPixels /
      imagePixels) *
    100
  );
}

// --------------------------------------------------
// Main damage detection
// --------------------------------------------------

export async function detectDamage(
  imagePath
) {
  const model =
    await loadModel();

  console.log(
    `Analyzing image: ${imagePath}`
  );

  // ----------------------------------------------
  // 1. Preprocess image
  // ----------------------------------------------

  const imageData =
    await createLetterboxImage(
      imagePath
    );

  // ----------------------------------------------
  // 2. Create tensor
  // ----------------------------------------------

  const tensorData =
    createTensorData(
      imageData
    );

  const inputTensor =
    new ort.Tensor(
      "float32",
      tensorData,
      [1, 3, 640, 640]
    );

  // ----------------------------------------------
  // 3. Run ONNX model
  // ----------------------------------------------

  const results =
    await model.run({
      images: inputTensor,
    });

  const detectionOutput =
    results.output0;

  const prototypeOutput =
    results.output1;

  const outputData =
    detectionOutput.data;

  // ----------------------------------------------
  // 4. Validate outputs
  // ----------------------------------------------

  if (
    detectionOutput.dims[0] !== 1 ||
    detectionOutput.dims[1] !== 42 ||
    detectionOutput.dims[2] !== NUM_PREDICTIONS
  ) {
    throw new Error(
      `Unexpected detection output shape: ${detectionOutput.dims}`
    );
  }

  if (
    prototypeOutput.dims[0] !== 1 ||
    prototypeOutput.dims[1] !== NUM_MASK_COEFFICIENTS ||
    prototypeOutput.dims[2] !== PROTO_HEIGHT ||
    prototypeOutput.dims[3] !== PROTO_WIDTH
  ) {
    throw new Error(
      `Unexpected prototype output shape: ${prototypeOutput.dims}`
    );
  }

  // ----------------------------------------------
  // 5. Decode detections
  // ----------------------------------------------

  const detections = [];

  for (
    let i = 0;
    i < NUM_PREDICTIONS;
    i++
  ) {
    const centerX =
      outputData[i];

    const centerY =
      outputData[
        NUM_PREDICTIONS + i
      ];

    const width =
      outputData[
        NUM_PREDICTIONS * 2 + i
      ];

    const height =
      outputData[
        NUM_PREDICTIONS * 3 + i
      ];

    let bestClassId = -1;

    let bestConfidence = 0;

    // --------------------------------------------
    // Class scores
    // --------------------------------------------

    for (
      let classIndex = 0;
      classIndex < NUM_CLASSES;
      classIndex++
    ) {
      const score =
        outputData[
          NUM_PREDICTIONS *
            (4 + classIndex) +
          i
        ];

      if (
        score >
        bestConfidence
      ) {
        bestConfidence =
          score;

        bestClassId =
          classIndex;
      }
    }

    if (
      bestClassId === -1 ||
      bestConfidence <
        CONFIDENCE_THRESHOLD
    ) {
      continue;
    }

    // --------------------------------------------
    // Box conversion
    // --------------------------------------------

    const x1 =
      centerX -
      width / 2;

    const y1 =
      centerY -
      height / 2;

    const x2 =
      centerX +
      width / 2;

    const y2 =
      centerY +
      height / 2;

    // --------------------------------------------
    // Original image coordinates
    // --------------------------------------------

    const originalBox =
      convertBoxToOriginalImage(
        {
          x1,
          y1,
          x2,
          y2,
        },
        imageData
      );

    // --------------------------------------------
    // Mask coefficients
    // --------------------------------------------

    const maskCoefficients =
      new Float32Array(
        NUM_MASK_COEFFICIENTS
      );

    for (
      let maskIndex = 0;
      maskIndex <
      NUM_MASK_COEFFICIENTS;
      maskIndex++
    ) {
      maskCoefficients[
        maskIndex
      ] =
        outputData[
          (
            4 +
            NUM_CLASSES +
            maskIndex
          ) *
            NUM_PREDICTIONS +
          i
        ];
    }

    detections.push({
      damageType:
        classNames[
          bestClassId
        ],

      classId:
        bestClassId,

      confidence:
        Number(
          bestConfidence.toFixed(4)
        ),

      boundingBox: {
        x1: Number(
          originalBox.x1.toFixed(2)
        ),

        y1: Number(
          originalBox.y1.toFixed(2)
        ),

        x2: Number(
          originalBox.x2.toFixed(2)
        ),

        y2: Number(
          originalBox.y2.toFixed(2)
        ),
      },

      maskCoefficients,
    });
  }

  // ----------------------------------------------
  // 6. NMS
  // ----------------------------------------------

  const finalDetections =
    applyNMS(detections);

  // ----------------------------------------------
  // 7. Generate segmentation masks
  // ----------------------------------------------

  const prototypeData =
    prototypeOutput.data;

  for (
    let i = 0;
    i < finalDetections.length;
    i++
  ) {
    const detection =
      finalDetections[i];

    const mask =
      generateMask(
        detection.maskCoefficients,
        prototypeData,
        detection.boundingBox,
        imageData.originalWidth,
        imageData.originalHeight,
        imageData.scale,
        imageData.paddingX,
        imageData.paddingY
      );

    detection.mask =
      mask;

    detection.damageAreaPercentage =
      Number(
        calculateMaskAreaPercentage(
          mask,
          imageData.originalWidth,
          imageData.originalHeight
        ).toFixed(2)
      );

    // Mask coefficients are internal
    // model data and should not be
    // returned by the API.
    delete detection.maskCoefficients;
  }

  // ----------------------------------------------
  // 8. API-ready result
  // ----------------------------------------------

  return {
    image: imagePath,

    imageSize: {
      width:
        imageData.originalWidth,

      height:
        imageData.originalHeight,
    },

    detections:
      finalDetections.map(
        (detection) => ({
          damageType:
            detection.damageType,

          classId:
            detection.classId,

          confidence:
            detection.confidence,

          damageAreaPercentage:
            detection.damageAreaPercentage,

          boundingBox:
            detection.boundingBox,
        })
      ),
  };
}