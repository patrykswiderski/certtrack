import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ESLint } from "eslint";

import { createBaseConfig } from "../base.js";
import { allowRawSqlIn, domainImportBoundaries } from "../boundaries.js";
import { createReactConfig } from "../react.js";

const PACKAGE_DIRECTORY = import.meta.dirname + "/..";
const FIXTURE_FILES = ["fixtures/*.ts"];

/**
 * @param {string} fixtureFileName
 * @param {import('eslint').Linter.Config[]} configurationEntries
 */
async function lintFixtureAndCollectRuleIds(fixtureFileName, configurationEntries) {
  const eslint = new ESLint({
    cwd: PACKAGE_DIRECTORY,
    overrideConfigFile: true,
    overrideConfig: configurationEntries,
  });
  const [lintResult] = await eslint.lintFiles([`fixtures/${fixtureFileName}`]);
  assert.ok(lintResult, `no lint result for ${fixtureFileName}`);
  return lintResult.messages.map((message) => message.ruleId);
}

function createBaseOptions() {
  return { tsconfigRootDir: PACKAGE_DIRECTORY, allowDefaultProject: FIXTURE_FILES };
}

describe("import boundaries and raw SQL ban", () => {
  it("forbids framework imports in the domain package", async () => {
    const ruleIds = await lintFixtureAndCollectRuleIds("domain-imports-nest.ts", [
      ...createBaseConfig(createBaseOptions()),
      domainImportBoundaries,
    ]);
    assert.ok(ruleIds.includes("no-restricted-imports"));
  });

  it("forbids database imports in the web app", async () => {
    const ruleIds = await lintFixtureAndCollectRuleIds(
      "web-imports-db.ts",
      createReactConfig(createBaseOptions()),
    );
    assert.ok(ruleIds.includes("no-restricted-imports"));
  });

  it("forbids raw SQL outside the allowlist", async () => {
    const ruleIds = await lintFixtureAndCollectRuleIds(
      "raw-sql.ts",
      createBaseConfig(createBaseOptions()),
    );
    assert.ok(ruleIds.includes("no-restricted-syntax"));
  });

  it("still forbids raw SQL when only another file is allowlisted", async () => {
    const ruleIds = await lintFixtureAndCollectRuleIds("raw-sql.ts", [
      ...createBaseConfig(createBaseOptions()),
      ...allowRawSqlIn(["fixtures/raw-sql-allowed.ts"]),
    ]);
    assert.ok(ruleIds.includes("no-restricted-syntax"));
  });

  it("permits raw SQL in an allowlisted file", async () => {
    const ruleIds = await lintFixtureAndCollectRuleIds("raw-sql-allowed.ts", [
      ...createBaseConfig(createBaseOptions()),
      ...allowRawSqlIn(["fixtures/raw-sql-allowed.ts"]),
    ]);
    assert.ok(!ruleIds.includes("no-restricted-syntax"));
  });
});
