import assert from "node:assert/strict";
import test from "node:test";
import { calculatePipelineProgress, pipelineState } from "../public/js/pipeline.mjs";

test("calculates progress for each completed stage", () => {
  assert.equal(calculatePipelineProgress(0), 0);
  assert.equal(calculatePipelineProgress(2), 51);
  assert.equal(calculatePipelineProgress(4), 100);
});

test("keeps progress inside the 0 to 100 range", () => {
  assert.equal(calculatePipelineProgress(-2), 0);
  assert.equal(calculatePipelineProgress(8), 100);
});

test("rejects invalid stage counts", () => {
  assert.throws(() => calculatePipelineProgress(1.5), TypeError);
  assert.throws(() => calculatePipelineProgress(1, 0), TypeError);
});

test("describes the current pipeline state", () => {
  assert.equal(pipelineState(0), "Waiting for a commit");
  assert.equal(pipelineState(2), "Pipeline running");
  assert.equal(pipelineState(4), "Deployment complete");
});
