const MAX_SCORE = 100;

function calculateConditionScore(detections = []) {
  if (!Array.isArray(detections) || detections.length === 0) {
    return {
      conditionScore: MAX_SCORE,
      status: "excellent",
    };
  }

  let totalPenalty = 0;

  for (const detection of detections) {
    const severityScore = detection.severityScore || 0;
    const damageArea = detection.damageAreaPercentage || 0;

    const severityPenalty = severityScore * 0.25;
    const areaPenalty = damageArea * 0.75;

    totalPenalty += severityPenalty + areaPenalty;
  }

  const conditionScore = Math.max(
    0,
    Math.min(
      MAX_SCORE,
      Math.round(MAX_SCORE - totalPenalty)
    )
  );

  let status;

  if (conditionScore >= 90) {
    status = "excellent";
  } else if (conditionScore >= 75) {
    status = "good";
  } else if (conditionScore >= 50) {
    status = "fair";
  } else {
    status = "poor";
  }

  return {
    conditionScore,
    status,
  };
}

export {
  calculateConditionScore,
};