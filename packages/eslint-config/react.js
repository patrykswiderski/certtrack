import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import { createBaseConfig } from "./base.js";
import { webImportBoundaries } from "./boundaries.js";

/**
 * @param {Parameters<typeof createBaseConfig>[0]} options
 */
export function createReactConfig(options) {
  return defineConfig(
    createBaseConfig(options),
    reactHooks.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    {
      name: "certtrack/react",
      languageOptions: { globals: globals.browser },
    },
    webImportBoundaries,
  );
}
