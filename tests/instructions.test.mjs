import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function readWorkspaceFile(relativePath) {
  return readFileSync(path.join(rootDir, relativePath), "utf8");
}

test("AGENTS.md documents Cloud agent branch and unit test requirements", () => {
  const agents = readWorkspaceFile("AGENTS.md");

  assert.match(agents, /Cloud agent feature work/i);
  assert.match(agents, /working branch named after the feature/i);
  assert.match(agents, /all unit tests to pass before opening a pull request/i);
});

test("feature workflow prompt requires branch, tests, and PR summary comments", () => {
  const prompt = readWorkspaceFile(".github/prompts/feature-workflow.prompt.md");

  assert.match(prompt, /working branch named after the feature/i);
  assert.match(prompt, /Add or update unit tests/i);
  assert.match(prompt, /all unit tests to pass before opening a pull request/i);
  assert.match(prompt, /include comments that summarize what changed/i);
});

test("Cloud agent workflow doc covers branch naming and PR validation", () => {
  const workflowDoc = readWorkspaceFile("docs/cloud-agent-workflow.md");

  assert.match(workflowDoc, /kebab-case/i);
  assert.match(workflowDoc, /all unit tests pass/i);
  assert.match(workflowDoc, /summarize what changed/i);
});

test("Clerk provider uses the shadcn theme", () => {
  const packageJson = readWorkspaceFile("package.json");
  const layout = readWorkspaceFile("app/layout.tsx");

  assert.match(packageJson, /"@clerk\/themes":/);
  assert.match(layout, /import\s+\{\s*shadcn\s*\}\s+from\s+"@clerk\/themes"/);
  assert.match(layout, /<ClerkProvider\s+appearance=\{\{\s*theme:\s*shadcn\s*\}\}/);
});