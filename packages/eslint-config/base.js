import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import { configs as typescriptEslintConfigs } from "typescript-eslint";

import { rawSqlBan } from "./boundaries.js";

export const IGNORED_PATHS = ["**/dist/**", "**/.turbo/**", "**/coverage/**", "**/node_modules/**"];

/**
 * @param {{ tsconfigRootDir: string, allowDefaultProject?: string[] }} options
 */
export function createBaseConfig({ tsconfigRootDir, allowDefaultProject = ["*.config.js"] }) {
  return defineConfig(
    { name: "certtrack/ignores", ignores: IGNORED_PATHS },
    eslint.configs.recommended,
    typescriptEslintConfigs.strictTypeChecked,
    typescriptEslintConfigs.stylisticTypeChecked,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    {
      name: "certtrack/base",
      languageOptions: {
        parserOptions: {
          projectService: { allowDefaultProject },
          tsconfigRootDir,
        },
      },
      settings: {
        "import-x/resolver-next": [createTypeScriptImportResolver()],
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "separate-type-imports" },
        ],
        "import-x/no-duplicates": "error",
        "import-x/no-cycle": "error",
        "import-x/order": [
          "error",
          { groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"] },
        ],
      },
    },
    {
      name: "certtrack/javascript-files",
      files: ["**/*.{js,mjs,cjs}"],
      extends: [typescriptEslintConfigs.disableTypeChecked],
    },
    rawSqlBan,
    prettierConfig,
  );
}
