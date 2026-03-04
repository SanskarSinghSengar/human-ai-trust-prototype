export type ConditionType = "neutral" | "humanlike";

export function assignCondition(): ConditionType {
  return Math.random() < 0.5 ? "neutral" : "humanlike";
}

export const conditionContent = {
  neutral: {
    name: "Decision Support System v3.2",
    message:
      "Based on quantitative performance modeling and historical evaluation metrics, Candidate A demonstrates a higher predicted performance score (P = 0.72).",
  },
  humanlike: {
    name: "Alex",
    message:
      "Hey! After reviewing everything, I’d go with Candidate A — they seem like the stronger overall fit 😊",
  },
};