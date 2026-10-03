import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const IMAGE_PATH = path.resolve("./Ai/images/test-car.jpg");
const OUTPUT_PATH = path.resolve("./Ai/node-input.bin");

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

  const padX = Math.floor(
    (INPUT_SIZE - resizedWidth) / 2
  );

  const padY = Math.floor(
    (INPUT_SIZE - resizedHeight) / 2
  );

  const resizedBuffer = await sharp(IMAGE_PATH)
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

  const chw = new Float32Array(
    3 * area
  );

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

  await fs.writeFile(
    OUTPUT_PATH,
    Buffer.from(chw.buffer)
  );

  console.log("Input saved successfully");
  console.log("Path:", OUTPUT_PATH);
  console.log("Values:", chw.length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});