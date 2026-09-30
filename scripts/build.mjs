import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public");
const output = path.join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const buildInfo = {
  application: packageJson.name,
  version: packageJson.version,
  commit: process.env.GITHUB_SHA?.slice(0, 7) ?? "local",
  runNumber: process.env.GITHUB_RUN_NUMBER ?? "local",
};

await writeFile(path.join(output, "build-info.json"), `${JSON.stringify(buildInfo, null, 2)}\n`);
console.log(`Built ${packageJson.name} ${packageJson.version} in ${output}`);
