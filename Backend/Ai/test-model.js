import ort from "onnxruntime-node";
import sharp from "sharp";

const imagePath = "./test-car.jpg";
const modelPath = "./best.onnx";

const INPUT_SIZE = 640;
const CONFIDENCE_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.45;

// We currently know class 8 from the Python test.
const classNames = {
  8: "doorouter-dent",
};

function getClassName(classId) {
  return classNames[classId] || `class-${classId}`;
}

function calculateIoU(boxA, boxB) {
  const x1 = Math.max(boxA.x1, boxB.x1);
  const y1 = Math.max(boxA.y1, boxB.y1);
  const x2 = Math.min(boxA.x2, boxB.x2);
  const y2 = Math.min(boxA.y2, boxB.y2);

  const intersectionWidth = Math.max(0, x2 - x1);
  const intersectionHeight = Math.max(0, y2 - y1);

  const intersectionArea =
    intersectionWidth * intersectionHeight;

  const areaA =
    (boxA.x2 - boxA.x1) *
    (boxA.y2 - boxA.y1);

  const areaB =
    (boxB.x2 - boxB.x1) *
    (boxB.y2 - boxB.y1);

  const unionArea =
    areaA + areaB - intersectionArea;

  if (unionArea <= 0) {
    return 0;
  }

  return intersectionArea / unionArea;
}

async function createLetterboxImage(imagePath) {
  // Get original image dimensions
  const metadata = await sharp(imagePath).metadata();

  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  if (!originalWidth || !originalHeight) {
    throw new Error("Could not read original image dimensions.");
  }

  // Same basic scaling logic used by YOLO/Ultralytics
  const scale = Math.min(
    INPUT_SIZE / originalWidth,
    INPUT_SIZE / originalHeight
  );

  const resizedWidth = Math.round(originalWidth * scale);
  const resizedHeight = Math.round(originalHeight * scale);

  // Total padding
  const padWidth = INPUT_SIZE - resizedWidth;
  const padHeight = INPUT_SIZE - resizedHeight;

  // Ultralytics-style padding distribution
  const left = Math.round(padWidth / 2 - 0.1);
  const top = Math.round(padHeight / 2 - 0.1);

  // Resize image while preserving aspect ratio
  const resizedBuffer = await sharp(imagePath)
    .resize({
      width: resizedWidth,
      height: resizedHeight,
      fit: "fill",
    })
    .removeAlpha()
    .raw()
    .toBuffer();

  // Create 640x640 canvas with YOLO padding value 114
  const letterboxBuffer = await sharp({
    create: {
      width: INPUT_SIZE,
      height: INPUT_SIZE,
      channels: 3,
      background: {
        r: 114,
        g: 114,
        b: 114,
      },
    },
  })
    .composite([
      {
        input: resizedBuffer,
        raw: {
          width: resizedWidth,
          height: resizedHeight,
          channels: 3,
        },
        left,
        top,
      },
    ])
    .removeAlpha()
    .raw()
    .toBuffer();

  return {
    data: letterboxBuffer,
    originalWidth,
    originalHeight,
    scale,
    padX: left,
    padY: top,
    resizedWidth,
    resizedHeight,
  };
}

function createCHWTensorData(
  imageData,
  width,
  height,
  channels
) {
  const chw = new Float32Array(
    channels * width * height
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex =
        (y * width + x) * channels;

      const r = imageData[pixelIndex];
      const g = imageData[pixelIndex + 1];
      const b = imageData[pixelIndex + 2];

      const position =
        y * width + x;

      // CHW format
      chw[position] = r / 255;
      chw[
        width * height + position
      ] = g / 255;
      chw[
        2 * width * height + position
      ] = b / 255;
    }
  }

  return chw;
}

function convertBoxToOriginalImage(
  x1,
  y1,
  x2,
  y2,
  scale,
  padX,
  padY,
  originalWidth,
  originalHeight
) {
  // Remove letterbox padding
  x1 = (x1 - padX) / scale;
  y1 = (y1 - padY) / scale;
  x2 = (x2 - padX) / scale;
  y2 = (y2 - padY) / scale;

  // Keep coordinates inside original image
  x1 = Math.max(
    0,
    Math.min(x1, originalWidth)
  );

  y1 = Math.max(
    0,
    Math.min(y1, originalHeight)
  );

  x2 = Math.max(
    0,
    Math.min(x2, originalWidth)
  );

  y2 = Math.max(
    0,
    Math.min(y2, originalHeight)
  );

  return {
    x1,
    y1,
    x2,
    y2,
  };
}

function applyNMS(detections) {
  const sorted = [...detections].sort(
    (a, b) => b.confidence - a.confidence
  );

  const finalDetections = [];

  while (sorted.length > 0) {
    const current = sorted.shift();

    finalDetections.push(current);

    for (let i = sorted.length - 1; i >= 0; i--) {
      const candidate = sorted[i];

      // Only suppress same-class detections
      if (candidate.classId !== current.classId) {
        continue;
      }

      const iou = calculateIoU(
        current.boundingBox,
        candidate.boundingBox
      );

      if (iou > IOU_THRESHOLD) {
        sorted.splice(i, 1);
      }
    }
  }

  return finalDetections;
}

async function main() {
  console.log("Loading model...");

  const session =
    await ort.InferenceSession.create(modelPath);

  console.log("Model loaded successfully!");

  console.log(
    "Input names:",
    session.inputNames
  );

  console.log(
    "Output names:",
    session.outputNames
  );

  // --------------------------------------------------
  // 1. Prepare image using letterbox preprocessing
  // --------------------------------------------------

  console.log("\nPreparing image...");

  const {
    data,
    originalWidth,
    originalHeight,
    scale,
    padX,
    padY,
    resizedWidth,
    resizedHeight,
  } = await createLetterboxImage(imagePath);

  console.log(
    "Original image:",
    `${originalWidth}x${originalHeight}`
  );

  console.log(
    "Resized image:",
    `${resizedWidth}x${resizedHeight}`
  );

  console.log(
    "Scale:",
    scale
  );

  console.log(
    "Padding:",
    {
      x: padX,
      y: padY,
    }
  );

  // --------------------------------------------------
  // 2. Convert RGB image to CHW Float32
  // --------------------------------------------------

  const inputData = createCHWTensorData(
    data,
    INPUT_SIZE,
    INPUT_SIZE,
    3
  );

  // --------------------------------------------------
  // 3. Create ONNX tensor
  // --------------------------------------------------

  const inputTensor = new ort.Tensor(
    "float32",
    inputData,
    [1, 3, INPUT_SIZE, INPUT_SIZE]
  );

  console.log(
    "\nInput shape:",
    inputTensor.dims
  );

  // --------------------------------------------------
  // 4. Run model
  // --------------------------------------------------

  const results = await session.run({
    images: inputTensor,
  });

  const output = results.output0;

  console.log(
    "Output shape:",
    output.dims
  );

  console.log(
    "Output data length:",
    output.data.length
  );

  // YOLO output:
  //
  // [1, 18, 8400]
  //
  // 18 = 4 box values + 14 class scores
  //
  // 4 = x, y, width, height
  // 14 = classes
  // 8400 = detection candidates

  const [, channels, numCandidates] =
    output.dims;

  const numClasses = channels - 4;

  const detections = [];

  // --------------------------------------------------
  // 5. Decode YOLO output
  // --------------------------------------------------

  for (
    let candidate = 0;
    candidate < numCandidates;
    candidate++
  ) {
    const centerX =
      output.data[candidate];

    const centerY =
      output.data[
        numCandidates + candidate
      ];

    const width =
      output.data[
        2 * numCandidates + candidate
      ];

    const height =
      output.data[
        3 * numCandidates + candidate
      ];

    let bestClassId = -1;
    let bestConfidence = 0;

    // Find highest class confidence
    for (
      let classId = 0;
      classId < numClasses;
      classId++
    ) {
      const confidence =
        output.data[
          (4 + classId) *
            numCandidates +
          candidate
        ];

      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        bestClassId = classId;
      }
    }

    // Confidence filtering
    if (
      bestConfidence <
      CONFIDENCE_THRESHOLD
    ) {
      continue;
    }

    // Convert xywh -> xyxy
    let x1 =
      centerX - width / 2;

    let y1 =
      centerY - height / 2;

    let x2 =
      centerX + width / 2;

    let y2 =
      centerY + height / 2;

    // ------------------------------------------------
    // 6. Convert 640x640 coordinates
    //    back to original image coordinates
    // ------------------------------------------------

    const originalBox =
      convertBoxToOriginalImage(
        x1,
        y1,
        x2,
        y2,
        scale,
        padX,
        padY,
        originalWidth,
        originalHeight
      );

    detections.push({
      classId: bestClassId,
      className:
        getClassName(bestClassId),
      confidence: bestConfidence,
      boundingBox: originalBox,
    });
  }

  // --------------------------------------------------
  // 7. Non-Maximum Suppression
  // --------------------------------------------------

  const finalDetections =
    applyNMS(detections);

  // --------------------------------------------------
  // 8. Print final results
  // --------------------------------------------------

  console.log(
    "\nFinal detections:"
  );

  if (finalDetections.length === 0) {
    console.log(
      "No damage detected."
    );
    return;
  }

  finalDetections.forEach(
    (detection, index) => {
      console.log(
        `\nDetection ${index + 1}`
      );

      console.log(
        "Class:",
        detection.className
      );

      console.log(
        "Class ID:",
        detection.classId
      );

      console.log(
        "Confidence:",
        `${(
          detection.confidence * 100
        ).toFixed(2)}%`
      );

      console.log(
        "Bounding box:",
        detection.boundingBox
      );
    }
  );
}

main().catch((error) => {
  console.error(
    "\nError:",
    error
  );
});