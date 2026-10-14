import { defineConfig } from "eslint/config";

import { createBaseConfig } from "@certtrack/eslint-config/base";

export default defineConfig(
  { name: "certtrack/root-ignores", ignores: ["apps/**", "packages/**"] },
  createBaseConfig({ tsconfigRootDir: import.meta.dirname }),
);
