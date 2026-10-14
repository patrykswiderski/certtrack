import { defineConfig } from "eslint/config";
import globals from "globals";

import { createBaseConfig } from "./base.js";

/**
 * @param {Parameters<typeof createBaseConfig>[0]} options
 */
export function createNestjsConfig(options) {
  return defineConfig(createBaseConfig(options), {
    name: "certtrack/nestjs",
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/no-extraneous-class": ["error", { allowWithDecorator: true }],
      "@typescript-eslint/consistent-type-imports": "off",
    },
  });
}
