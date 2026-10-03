import sharp from "sharp";
import path from "path";

const IMAGE_PATH = path.resolve("./Ai/images/test-car.jpg");
const INPUT_SIZE = 640;

async function main() {
  const metadata = await sharp(IMAGE_PATH).metadata();

  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  const scale = Math.min(
    INPUT_SIZE / originalWidth,
    INPUT_SIZE / originalHeight
  );

  const resizedWidth = Math.round(originalWidth * scale);
  const resizedHeight = Math.round(originalHeight * scale);

  const padX = Math.floor((INPUT_SIZE - resizedWidth) / 2);
  const padY = Math.floor((INPUT_SIZE - resizedHeight) / 2);

  // Resize image first
  const resizedBuffer = await sharp(IMAGE_PATH)
    .resize(resizedWidth, resizedHeight, {
      fit: "fill",
      kernel: sharp.kernel.cubic,
    })
    .removeAlpha()
    .raw()
    .toBuffer();

  // Create 640x640 RGB canvas manually
  const canvas = Buffer.alloc(
    INPUT_SIZE * INPUT_SIZE * 3,
    114
  );

  // Copy resized RGB pixels into padded canvas
  for (let y = 0; y < resizedHeight; y++) {
    for (let x = 0; x < resizedWidth; x++) {
      const sourceIndex = (y * resizedWidth + x) * 3;

      const targetX = x + padX;
      const targetY = y + padY;

      const targetIndex =
        (targetY * INPUT_SIZE + targetX) * 3;

      canvas[targetIndex] = resizedBuffer[sourceIndex];
      canvas[targetIndex + 1] = resizedBuffer[sourceIndex + 1];
      canvas[targetIndex + 2] = resizedBuffer[sourceIndex + 2];
    }
  }

  // HWC -> CHW
  const chw = new Float32Array(
    3 * INPUT_SIZE * INPUT_SIZE
  );

  const area = INPUT_SIZE * INPUT_SIZE;

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

  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (const value of chw) {
    if (value < min) min = value;
    if (value > max) max = value;
    sum += value;
  }

  const mean = sum / chw.length;

  console.log("Original:", `${originalWidth}x${originalHeight}`);
  console.log("Scale:", scale);
  console.log("Resized:", `${resizedWidth}x${resizedHeight}`);
  console.log("Padding:", { x: padX, y: padY });

  console.log("Tensor length:", chw.length);
  console.log("Tensor min:", min);
  console.log("Tensor max:", max);
  console.log("Tensor mean:", mean);

  console.log(
    "Tensor first 20:",
    Array.from(chw.slice(0, 20))
  );

  console.log("\nSample pixels:");

  console.log("Top-left RGB:", [
    canvas[0],
    canvas[1],
    canvas[2],
  ]);

  const centerIndex =
    (320 * INPUT_SIZE + 320) * 3;

  console.log("Center RGB:", [
    canvas[centerIndex],
    canvas[centerIndex + 1],
    canvas[centerIndex + 2],
  ]);
}

main().catch((error) => {
  console.error("\nError:");
  console.error(error);
  process.exit(1);
}); 