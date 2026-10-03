import * as ort from "onnxruntime-node";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const IMAGE_PATH = path.resolve("./Ai/images/test-car.jpg");
const MODEL_PATH = path.resolve("./Ai/models/best.onnx");

const INPUT_SIZE = 640;
const CONFIDENCE_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.45;

const CLASS_NAMES = [
  "crack",
  "dent",
  "glass shatter",
  "lamp broken",
  "scratch",
  "tire flat",
];

const NUM_CLASSES = 6;
const NUM_PREDICTIONS = 8400;
const NUM_MASK_COEFFICIENTS = 32;

const PROTO_WIDTH = 160;
const PROTO_HEIGHT = 160;

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
    Math.max(0, boxA.x2 - boxA.x1) *
    Math.max(0, boxA.y2 - boxA.y1);

  const areaB =
    Math.max(0, boxB.x2 - boxB.x1) *
    Math.max(0, boxB.y2 - boxB.y1);

  const unionArea =
    areaA + areaB - intersectionArea;

  if (unionArea <= 0) return 0;

  return intersectionArea / unionArea;
}

async function prepareImage(imagePath) {
  const metadata = await sharp(imagePath).metadata();

  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  if (!originalWidth || !originalHeight) {
    throw new Error("Could not read image dimensions.");
  }

  const scale = Math.min(
    INPUT_SIZE / originalWidth,
    INPUT_SIZE / originalHeight
  );

  const resizedWidth = Math.round(originalWidth * scale);
  const resizedHeight = Math.round(originalHeight * scale);

  const padX = Math.floor(
    (INPUT_SIZE - resizedWidth) / 2
  );

  const padY = Math.floor(
    (INPUT_SIZE - resizedHeight) / 2
  );

  const resizedBuffer = await sharp(imagePath)
    .resize(resizedWidth, resizedHeight, {
      fit: "fill",
      kernel: sharp.kernel.cubic,
    })
    .removeAlpha()
    .raw()
    .toBuffer();

  const canvas = Buffer.alloc(
    INPUT_SIZE * INPUT_SIZE * 3,
    114
  );

  for (let y = 0; y < resizedHeight; y++) {
    for (let x = 0; x < resizedWidth; x++) {
      const sourceIndex =
        (y * resizedWidth + x) * 3;

      const targetIndex =
        ((y + padY) * INPUT_SIZE + (x + padX)) * 3;

      canvas[targetIndex] =
        resizedBuffer[sourceIndex];

      canvas[targetIndex + 1] =
        resizedBuffer[sourceIndex + 1];

      canvas[targetIndex + 2] =
        resizedBuffer[sourceIndex + 2];
    }
  }

  const area = INPUT_SIZE * INPUT_SIZE;

  const chw = new Float32Array(3 * area);

  for (let y = 0; y < INPUT_SIZE; y++) {
    for (let x = 0; x < INPUT_SIZE; x++) {
      const pixelIndex =
        (y * INPUT_SIZE + x) * 3;

      const position =
        y * INPUT_SIZE + x;

      chw[position] =
        canvas[pixelIndex] / 255;

      chw[area + position] =
        canvas[pixelIndex + 1] / 255;

      chw[2 * area + position] =
        canvas[pixelIndex + 2] / 255;
    }
  }

  return {
    tensorData: chw,
    originalWidth,
    originalHeight,
    scale,
    padX,
    padY,
  };
}

function convertBoxToOriginal(
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
  x1 = (x1 - padX) / scale;
  y1 = (y1 - padY) / scale;
  x2 = (x2 - padX) / scale;
  y2 = (y2 - padY) / scale;

  return {
    x1: Math.max(
      0,
      Math.min(x1, originalWidth)
    ),
    y1: Math.max(
      0,
      Math.min(y1, originalHeight)
    ),
    x2: Math.max(
      0,
      Math.min(x2, originalWidth)
    ),
    y2: Math.max(
      0,
      Math.min(y2, originalHeight)
    ),
  };
}

function applyNMS(detections) {
  const sorted = [...detections].sort(
    (a, b) => b.confidence - a.confidence
  );

  const results = [];

  while (sorted.length > 0) {
    const current = sorted.shift();

    results.push(current);

    for (let i = sorted.length - 1; i >= 0; i--) {
      const other = sorted[i];

      if (other.classId !== current.classId) {
        continue;
      }

      const iou = calculateIoU(
        current.boundingBox,
        other.boundingBox
      );

      if (iou > IOU_THRESHOLD) {
        sorted.splice(i, 1);
      }
    }
  }

  return results;
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function generateMask(
  maskCoefficients,
  prototypeData,
  boundingBox,
  originalWidth,
  originalHeight,
  scale,
  padX,
  padY
) {
  const maskWidth = PROTO_WIDTH;
  const maskHeight = PROTO_HEIGHT;

  const mask = new Uint8Array(
    originalWidth * originalHeight
  );

  const threshold = 0.5;

  for (let y = 0; y < originalHeight; y++) {
    for (let x = 0; x < originalWidth; x++) {
      const inputX =
        x * scale + padX;

      const inputY =
        y * scale + padY;

      const protoX = Math.floor(
        (inputX / INPUT_SIZE) * maskWidth
      );

      const protoY = Math.floor(
        (inputY / INPUT_SIZE) * maskHeight
      );

      if (
        protoX < 0 ||
        protoX >= maskWidth ||
        protoY < 0 ||
        protoY >= maskHeight
      ) {
        continue;
      }

      const boxX1 = boundingBox.x1;
      const boxY1 = boundingBox.y1;
      const boxX2 = boundingBox.x2;
      const boxY2 = boundingBox.y2;

      if (
        x < boxX1 ||
        x > boxX2 ||
        y < boxY1 ||
        y > boxY2
      ) {
        continue;
      }

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

      const probability = sigmoid(maskValue);

      if (probability >= threshold) {
        mask[
          y * originalWidth + x
        ] = 255;
      }
    }
  }

  return mask;
}

async function createVisualization(
  imagePath,
  detections,
  outputPath
) {
  const metadata = await sharp(imagePath).metadata();

  const width = metadata.width;
  const height = metadata.height;

  const channels = 4;

  const imageBuffer = await sharp(imagePath)
    .ensureAlpha()
    .raw()
    .toBuffer();

  const output = Buffer.from(imageBuffer);

  for (const detection of detections) {
    const mask = detection.mask;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const maskIndex =
          y * width + x;

        if (mask[maskIndex] === 0) {
          continue;
        }

        const pixelIndex =
          maskIndex * channels;

        output[pixelIndex] = Math.min(
          255,
          output[pixelIndex] + 100
        );

        output[pixelIndex + 1] = Math.max(
          0,
          output[pixelIndex + 1] - 70
        );

        output[pixelIndex + 2] = Math.max(
          0,
          output[pixelIndex + 2] - 70
        );

        output[pixelIndex + 3] = 255;
      }
    }

    const box = detection.boundingBox;

    const x1 = Math.round(box.x1);
    const y1 = Math.round(box.y1);
    const x2 = Math.round(box.x2);
    const y2 = Math.round(box.y2);

    for (let x = x1; x <= x2; x++) {
      if (x < 0 || x >= width) continue;

      if (y1 >= 0 && y1 < height) {
        const index =
          (y1 * width + x) * channels;

        output[index] = 255;
        output[index + 1] = 0;
        output[index + 2] = 0;
        output[index + 3] = 255;
      }

      if (y2 >= 0 && y2 < height) {
        const index =
          (y2 * width + x) * channels;

        output[index] = 255;
        output[index + 1] = 0;
        output[index + 2] = 0;
        output[index + 3] = 255;
      }
    }

    for (let y = y1; y <= y2; y++) {
      if (y < 0 || y >= height) continue;

      if (x1 >= 0 && x1 < width) {
        const index =
          (y * width + x1) * channels;

        output[index] = 255;
        output[index + 1] = 0;
        output[index + 2] = 0;
        output[index + 3] = 255;
      }

      if (x2 >= 0 && x2 < width) {
        const index =
          (y * width + x2) * channels;

        output[index] = 255;
        output[index + 1] = 0;
        output[index + 2] = 0;
        output[index + 3] = 255;
      }
    }
  }

  await sharp(output, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .jpeg({ quality: 90 })
    .toFile(outputPath);
}

async function main() {
  console.log("================================");
  console.log("YOLO11 SEGMENTATION TEST");
  console.log("================================");

  console.log("\nLoading model...");

  const session =
    await ort.InferenceSession.create(
      MODEL_PATH,
      {
        executionProviders: ["cpu"],
      }
    );

  console.log("Model loaded successfully.");
  console.log("Input names:", session.inputNames);
  console.log("Output names:", session.outputNames);

  console.log("\nPreparing image...");

  const imageData =
    await prepareImage(IMAGE_PATH);

  console.log(
    "Original image:",
    `${imageData.originalWidth}x${imageData.originalHeight}`
  );

  console.log(
    "Scale:",
    imageData.scale
  );

  console.log(
    "Padding:",
    {
      x: imageData.padX,
      y: imageData.padY,
    }
  );

  const inputTensor =
    new ort.Tensor(
      "float32",
      imageData.tensorData,
      [1, 3, INPUT_SIZE, INPUT_SIZE]
    );

  console.log("\nRunning inference...");

  const results =
    await session.run({
      images: inputTensor,
    });

  const detectionOutput =
    results.output0;

  const prototypeOutput =
    results.output1;

  console.log(
    "Detection output shape:",
    detectionOutput.dims
  );

  console.log(
    "Prototype output shape:",
    prototypeOutput.dims
  );

  const detections = [];

  for (
    let candidate = 0;
    candidate < NUM_PREDICTIONS;
    candidate++
  ) {
    const centerX =
      detectionOutput.data[candidate];

    const centerY =
      detectionOutput.data[
        NUM_PREDICTIONS + candidate
      ];

    const width =
      detectionOutput.data[
        2 * NUM_PREDICTIONS + candidate
      ];

    const height =
      detectionOutput.data[
        3 * NUM_PREDICTIONS + candidate
      ];

    let bestClassId = -1;
    let bestConfidence = 0;

    for (
      let classId = 0;
      classId < NUM_CLASSES;
      classId++
    ) {
      const score =
        detectionOutput.data[
          (4 + classId) *
            NUM_PREDICTIONS +
          candidate
        ];

      if (score > bestConfidence) {
        bestConfidence = score;
        bestClassId = classId;
      }
    }

    if (
      bestClassId === -1 ||
      bestConfidence < CONFIDENCE_THRESHOLD
    ) {
      continue;
    }

    const x1 = centerX - width / 2;
    const y1 = centerY - height / 2;
    const x2 = centerX + width / 2;
    const y2 = centerY + height / 2;

    const boundingBox =
      convertBoxToOriginal(
        x1,
        y1,
        x2,
        y2,
        imageData.scale,
        imageData.padX,
        imageData.padY,
        imageData.originalWidth,
        imageData.originalHeight
      );

    const maskCoefficients =
      new Float32Array(
        NUM_MASK_COEFFICIENTS
      );

    for (
      let maskIndex = 0;
      maskIndex < NUM_MASK_COEFFICIENTS;
      maskIndex++
    ) {
      maskCoefficients[maskIndex] =
        detectionOutput.data[
          (
            4 +
            NUM_CLASSES +
            maskIndex
          ) *
            NUM_PREDICTIONS +
          candidate
        ];
    }

    detections.push({
      classId: bestClassId,
      damageType:
        CLASS_NAMES[bestClassId],
      confidence: bestConfidence,
      boundingBox,
      maskCoefficients,
    });
  }

  const finalDetections =
    applyNMS(detections);

  console.log(
    "\n================================"
  );

  console.log(
    "FINAL DETECTIONS:",
    finalDetections.length
  );

  console.log(
    "================================"
  );

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
        imageData.padX,
        imageData.padY
      );

    detection.mask = mask;

    let maskPixels = 0;

    for (
      let pixel = 0;
      pixel < mask.length;
      pixel++
    ) {
      if (mask[pixel] > 0) {
        maskPixels++;
      }
    }

    const imagePixels =
      imageData.originalWidth *
      imageData.originalHeight;

    const damageAreaPercentage =
      (maskPixels / imagePixels) * 100;

    detection.damageAreaPercentage =
      damageAreaPercentage;

    console.log(
      `\nDetection ${i + 1}`
    );

    console.log(
      "Damage:",
      detection.damageType
    );

    console.log(
      "Confidence:",
      (
        detection.confidence * 100
      ).toFixed(2) + "%"
    );

    console.log(
      "Damage area:",
      damageAreaPercentage.toFixed(2) + "%"
    );

    console.log(
      "Bounding box:",
      {
        x1: Number(
          detection.boundingBox.x1.toFixed(2)
        ),
        y1: Number(
          detection.boundingBox.y1.toFixed(2)
        ),
        x2: Number(
          detection.boundingBox.x2.toFixed(2)
        ),
        y2: Number(
          detection.boundingBox.y2.toFixed(2)
        ),
      }
    );
  }

  const resultsDirectory =
    path.resolve("./Ai/results");

  if (!fs.existsSync(resultsDirectory)) {
    fs.mkdirSync(resultsDirectory, {
      recursive: true,
    });
  }

  const outputPath =
    path.join(
      resultsDirectory,
      "segmentation-result.jpg"
    );

  await createVisualization(
    IMAGE_PATH,
    finalDetections,
    outputPath
  );

  console.log(
    "\n================================"
  );

  console.log(
    "SEGMENTATION MASK GENERATED"
  );

  console.log(
    "================================"
  );

  console.log(
    "Result saved:",
    outputPath
  );

  console.log(
    "\nONNX SEGMENTATION INFERENCE SUCCESSFUL"
  );
}

main().catch((error) => {
  console.error("\nError:");
  console.error(error);
  process.exit(1);
});