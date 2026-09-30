import { calculatePipelineProgress, pipelineStages, pipelineState } from "./pipeline.mjs";

const stageList = document.querySelector("[data-stage-list]");
const progress = document.querySelector("[data-progress]");
const progressText = document.querySelector("[data-progress-text]");
const state = document.querySelector("[data-state]");
const runButton = document.querySelector("[data-run]");
const resetButton = document.querySelector("[data-reset]");

let completedStages = 0;

function render() {
  stageList.replaceChildren(...pipelineStages.map((stage, index) => {
    const item = document.createElement("li");
    item.className = index < completedStages ? "stage complete" : index === completedStages ? "stage active" : "stage";
    item.innerHTML = `<span>${index + 1}</span><div><strong>${stage.label}</strong><p>${stage.description}</p></div>`;
    return item;
  }));

  const percent = calculatePipelineProgress(completedStages);
  progress.style.width = `${percent}%`;
  progressText.textContent = `${percent}%`;
  state.textContent = pipelineState(completedStages);
  runButton.disabled = completedStages === pipelineStages.length;
}

runButton.addEventListener("click", () => {
  completedStages = Math.min(completedStages + 1, pipelineStages.length);
  render();
});

resetButton.addEventListener("click", () => {
  completedStages = 0;
  render();
});

render();
