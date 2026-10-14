import { readFile } from "node:fs/promises";

const nodeVersion: string = process.version;

export async function readTextFile(path: string): Promise<string> {
  return readFile(path, "utf-8");
}

export { nodeVersion };
