import * as ort from "onnxruntime-node";
import fs from "fs";

const MODEL_PATH = "./Ai/models/best.onnx";
const INPUT_PATH = "./Ai/node-input.bin";

async function main() {
  const session = await ort.InferenceSession.create(MODEL_PATH, {
    executionProviders: ["cpu"],
  });

  const buffer = fs.readFileSync(INPUT_PATH);

  const inputData = new Float32Array(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength / 4
  );

  const inputTensor = new ort.Tensor(
    "float32",
    inputData,
    [1, 3, 640, 640]
  );

  const output = await session.run({
    images: inputTensor,
  });

  const data = output.output0.data;

  console.log("Output shape:", output.output0.dims);

  const candidates = [];

  for (let i = 0; i < 8400; i++) {
    let bestClass = -1;
    let bestScore = -Infinity;

    for (let c = 0; c < 6; c++) {
      const score = data[(4 + c) * 8400 + i];

      if (score > bestScore) {
        bestScore = score;
        bestClass = c;
      }
    }

    candidates.push({
      index: i,
      class: bestClass,
      score: bestScore,
      box: [
        data[i],
        data[8400 + i],
        data[2 * 8400 + i],
        data[3 * 8400 + i],
      ],
    });
  }

  candidates.sort((a, b) => b.score - a.score);

  console.log("\nTop 10:");

  for (const item of candidates.slice(0, 10)) {
    console.log(
      item.index,
      "class",
      item.class,
      "score",
      item.score,
      "box=",
      item.box
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});