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

  if (unionArea <= 0) {
    return 0;
  }

  return intersectionArea / unionArea;
}


// Total damage area
function calculateTotalDamageArea(detections) {
  return Number(
    detections
      .reduce(
        (total, detection) =>
          total +
          (Number(detection.damageAreaPercentage) || 0),
        0
      )
      .toFixed(2)
  );
}


// Overall severity
function calculateOverallSeverity(detections) {
  if (
    !Array.isArray(detections) ||
    detections.length === 0
  ) {
    return "none";
  }

  const severityWeights = {
    light: 1,
    moderate: 2,
    severe: 3,
  };

  let highestScore = 0;
  let overallSeverity = "light";

  for (const detection of detections) {
    const severity =
      detection.severity?.toLowerCase();

    const score =
      severityWeights[severity] || 1;

    if (score > highestScore) {
      highestScore = score;
      overallSeverity = severity;
    }
  }

  return overallSeverity;
}


// Aggregate damage
function aggregateDamage(detections) {
  if (
    !Array.isArray(detections) ||
    detections.length === 0
  ) {
    return {
      detections: [],
      summary: {
        totalDamages: 0,
        damageTypes: {},
        totalDamageAreaPercentage: 0,
        overallSeverity: "none",
      },
    };
  }

  const aggregated = [];

  // Deduplicate overlapping detections
  for (const detection of detections) {
    let merged = false;

    for (const existing of aggregated) {
      const sameDamageType =
        existing.damageType ===
        detection.damageType;

      const overlap = calculateIoU(
        existing.boundingBox,
        detection.boundingBox
      );

      if (
        sameDamageType &&
        overlap >= 0.5
      ) {
        // Keep highest-confidence detection
        if (
          detection.confidence >
          existing.confidence
        ) {
          existing.confidence =
            detection.confidence;

          existing.boundingBox =
            detection.boundingBox;

          existing.damageAreaRatio =
            detection.damageAreaRatio;
        }

        // Keep larger damage area
        existing.damageAreaPercentage =
          Number(
            Math.max(
              Number(
                existing.damageAreaPercentage
              ) || 0,
              Number(
                detection.damageAreaPercentage
              ) || 0
            ).toFixed(2)
          );

        // Keep higher severity
        if (
          (Number(detection.severityScore) || 0) >
          (Number(existing.severityScore) || 0)
        ) {
          existing.severity =
            detection.severity;

          existing.severityScore =
            detection.severityScore;

          existing.damageAreaRatio =
            detection.damageAreaRatio;
        }

        merged = true;
        break;
      }
    }

    if (!merged) {
      aggregated.push({
        ...detection,
      });
    }
  }


  // Damage type summary
  const damageTypes = {};

  for (const detection of aggregated) {
    if (!damageTypes[detection.damageType]) {
      damageTypes[detection.damageType] = 0;
    }

    damageTypes[detection.damageType]++;
  }


  // Overall metrics
  const totalDamageAreaPercentage =
    calculateTotalDamageArea(
      aggregated
    );

  const overallSeverity =
    calculateOverallSeverity(
      aggregated
    );


  return {
    detections: aggregated,

    summary: {
      totalDamages:
        aggregated.length,

      damageTypes,

      totalDamageAreaPercentage,

      overallSeverity,
    },
  };
}


export {
  calculateIoU,
  calculateTotalDamageArea,
  calculateOverallSeverity,
  aggregateDamage,
};