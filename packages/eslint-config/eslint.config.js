import { defineConfig } from "eslint/config";

import { createBaseConfig } from "./base.js";

export default defineConfig(
  { name: "certtrack/eslint-config-ignores", ignores: ["fixtures/**"] },
  createBaseConfig({ tsconfigRootDir: import.meta.dirname }),
);
