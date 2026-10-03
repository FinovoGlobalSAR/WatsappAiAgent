import * as ort from "onnxruntime-node";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelPath = path.join(__dirname, "../models/best.onnx");

let session;

export async function loadModel() {
  session = await ort.InferenceSession.create(modelPath);

  console.log("AI model loaded successfully");

  console.log("Input names:", session.inputNames);
  console.log("Output names:", session.outputNames);
}

export function getSession() {
  if (!session) {
    throw new Error("AI model is not loaded");
  }

  return session;
}