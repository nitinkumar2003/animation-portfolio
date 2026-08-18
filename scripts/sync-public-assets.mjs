import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(projectRoot, "public");

await mkdir(publicDirectory, { recursive: true });
await copyFile(path.join(projectRoot, "src/assets/NKJ.jpeg"), path.join(publicDirectory, "favicon.jpeg"));
