export const pipelineStages = [
  { id: "source", label: "Source", description: "A change is committed and reviewed." },
  { id: "test", label: "Test", description: "Automated checks protect quality." },
  { id: "build", label: "Build", description: "A repeatable artifact is created." },
  { id: "deploy", label: "Deploy", description: "The verified artifact reaches users." },
];

export function calculatePipelineProgress(completedStages, totalStages = pipelineStages.length) {
  if (!Number.isInteger(completedStages) || !Number.isInteger(totalStages) || totalStages <= 0) {
    throw new TypeError("Stage counts must be integers and totalStages must be positive.");
  }

  const boundedCompleted = Math.min(Math.max(completedStages, 0), totalStages);
  return Math.round((boundedCompleted / totalStages) * 100);
}

export function pipelineState(completedStages) {
  if (completedStages <= 0) return "Waiting for a commit";
  if (completedStages < pipelineStages.length) return "Pipeline running";
  return "Deployment complete";
}
