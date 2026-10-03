import fs from "fs";
import path from "path";

import { validateImage } from "./services/imageValidator.js";
import { detectDamage } from "./services/damageDetector.js";
import { addSeverityToDetections } from "./services/severityCalculator.js";

const IMAGES_FOLDER = "./images";

async function processImages() {
  console.log("Reading images folder...\n");

  const files = fs.readdirSync(IMAGES_FOLDER);

  const imageFiles = files.filter((file) => {
    const extension = path.extname(file).toLowerCase();

    return [".jpg", ".jpeg", ".png", ".webp"].includes(extension);
  });

  console.log(`Found ${imageFiles.length} image(s).\n`);

  const finalResults = [];

  for (const file of imageFiles) {
    const imagePath = path.join(IMAGES_FOLDER, file);

    console.log("==============================");
    console.log(`Processing: ${file}`);
    console.log("==============================");

    // STEP 1: Validate image
    const validationResult = await validateImage(imagePath);

    if (!validationResult.valid) {
      console.log("Image validation FAILED.");

      console.log("Errors:");

      validationResult.errors.forEach((error) => {
        console.log(`- ${error}`);
      });

      finalResults.push({
        image: file,
        validation: validationResult,
        detections: [],
      });

      console.log();

      continue;
    }

    console.log("Image validation PASSED.");
    console.log(
      `Size: ${validationResult.width}x${validationResult.height}`
    );
    console.log(`Format: ${validationResult.format}`);

    // STEP 2: AI damage detection
    const detectionResult = await detectDamage(imagePath);

    const detections = detectionResult.detections;

    console.log(`Detections: ${detections.length}`);

    detections.forEach((detection) => {
      console.log(
        `- ${detection.damageType} | ${(detection.confidence * 100).toFixed(
          2
        )}%`
      );
    });

    // STEP 3: Severity assessment
    const detectionsWithSeverity = addSeverityToDetections(
      detectionResult.detections,
      detectionResult.imageSize.width,
      detectionResult.imageSize.height
    );

    console.log("\nSeverity Assessment:");

    detectionsWithSeverity.forEach((detection) => {
      console.log(
        `- ${detection.damageType} | ` +
          `${(detection.confidence * 100).toFixed(2)}% | ` +
          `${detection.severity} | ` +
          `Score: ${detection.severityScore}`
      );
    });

    // Final result for this image
    finalResults.push({
      image: file,
      validation: validationResult,
      detections: detectionsWithSeverity,
    });

    console.log();
  }

  // FINAL RESULT
  console.log("==============================");
  console.log("FINAL VALIDATION + AI RESULT");
  console.log("==============================\n");

  console.log(JSON.stringify(finalResults, null, 2));
}

processImages().catch((error) => {
  console.error("Error processing images:");
  console.error(error);
});
