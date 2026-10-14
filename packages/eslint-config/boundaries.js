const WEB_FORBIDDEN_PATTERNS = [
  {
    group: ["@certtrack/api", "@certtrack/api/*"],
    message: "The web app must not import the API. Share types through @certtrack/contracts.",
  },
  {
    group: ["@certtrack/db", "@certtrack/db/*", "@prisma/*"],
    message: "The web app must not import the database layer or Prisma.",
  },
  {
    group: ["**/generated/prisma", "**/generated/prisma/**"],
    message: "The web app must not import the generated Prisma client.",
  },
  {
    group: ["**/apps/api/**", "**/packages/db/**"],
    message: "Do not reach into api or db sources with relative paths.",
  },
];

const DOMAIN_FORBIDDEN_PATTERNS = [
  {
    group: ["@nestjs/*", "express", "express/*"],
    message: "packages/domain is framework-free: no NestJS or Express.",
  },
  {
    group: ["react", "react/*", "react-dom", "react-dom/*"],
    message: "packages/domain is framework-free: no React.",
  },
  {
    group: ["@prisma/*", "@certtrack/db", "@certtrack/db/*", "bullmq"],
    message: "packages/domain must not depend on persistence or queue infrastructure.",
  },
];

const RAW_SQL_SELECTOR = "MemberExpression[property.name=/^[$](query|execute)Raw(Unsafe)?$/]";

/** @type {import('eslint').Linter.Config} */
export const rawSqlBan = {
  name: "certtrack/raw-sql-ban",
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: RAW_SQL_SELECTOR,
        message:
          "Raw SQL bypasses tenant isolation. Use it only in files on the raw SQL allowlist (see CT-107).",
      },
    ],
  },
};

/** @type {import('eslint').Linter.Config} */
export const webImportBoundaries = {
  name: "certtrack/web-import-boundaries",
  rules: {
    "no-restricted-imports": ["error", { patterns: WEB_FORBIDDEN_PATTERNS }],
  },
};

/** @type {import('eslint').Linter.Config} */
export const domainImportBoundaries = {
  name: "certtrack/domain-import-boundaries",
  rules: {
    "no-restricted-imports": ["error", { patterns: DOMAIN_FORBIDDEN_PATTERNS }],
  },
};

/**
 * @param {string[]} allowedFiles glob patterns of files allowed to use raw SQL
 * @returns {import('eslint').Linter.Config[]}
 */
export function allowRawSqlIn(allowedFiles) {
  if (allowedFiles.length === 0) {
    return [];
  }
  return [
    {
      name: "certtrack/raw-sql-allowlist",
      files: allowedFiles,
      rules: { "no-restricted-syntax": "off" },
    },
  ];
}
