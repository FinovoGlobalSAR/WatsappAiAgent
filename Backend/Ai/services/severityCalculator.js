const SEVERITY_LEVELS = {
  LIGHT: "light",
  MODERATE: "moderate",
  SEVERE: "severe",
};

const DAMAGE_TYPE_WEIGHTS = {
  scratch: 1,
  dent: 2,
  crack: 2,
  "glass shatter": 3,
  "lamp broken": 3,
  "tire flat": 4,
};

function calculateSeverity(detection, imageWidth, imageHeight) {
  const { confidence, boundingBox, damageType } = detection;

  const boxWidth = Math.max(0, boundingBox.x2 - boundingBox.x1);
  const boxHeight = Math.max(0, boundingBox.y2 - boundingBox.y1);

  const damageArea = boxWidth * boxHeight;
  const imageArea = imageWidth * imageHeight;

  const areaRatio = imageArea > 0 ? damageArea / imageArea : 0;

  let severityScore = 0;

  // Confidence contribution: 0–40
  if (confidence >= 0.8) {
    severityScore += 40;
  } else if (confidence >= 0.5) {
    severityScore += 25;
  } else {
    severityScore += 10;
  }

  // Damage size contribution: 0–40
  if (areaRatio >= 0.15) {
    severityScore += 40;
  } else if (areaRatio >= 0.05) {
    severityScore += 25;
  } else {
    severityScore += 10;
  }

  // Damage type contribution: 0–20
  const damageWeight = DAMAGE_TYPE_WEIGHTS[damageType] || 1;

  severityScore += damageWeight * 5;

  let severity;

  if (severityScore >= 70) {
    severity = SEVERITY_LEVELS.SEVERE;
  } else if (severityScore >= 45) {
    severity = SEVERITY_LEVELS.MODERATE;
  } else {
    severity = SEVERITY_LEVELS.LIGHT;
  }

  return {
    severity,
    severityScore,
    damageAreaRatio: Number(areaRatio.toFixed(4)),
  };
}

function addSeverityToDetections(
  detections,
  imageWidth,
  imageHeight
) {
  return detections.map((detection) => {
    const severityResult = calculateSeverity(
      detection,
      imageWidth,
      imageHeight
    );

    return {
      ...detection,
      ...severityResult,
    };
  });
}

export {
  SEVERITY_LEVELS,
  calculateSeverity,
  addSeverityToDetections,
};