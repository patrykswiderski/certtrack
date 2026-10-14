# CertTrack

Monorepo managed with pnpm workspaces and Turborepo.

## Requirements

- Node.js 24 LTS (see `.nvmrc`; with fnm run `fnm use 24`)
- pnpm 12.x, installed directly. Corepack is not bundled with Node from version 25, so it is not used here:

  ```bash
  npm install --global pnpm@12.11.2
  ```

- gitleaks 8.19 or newer on the `PATH`, used by the pre-commit hook (Windows: `winget install Gitleaks.Gitleaks`)

## Getting started

```bash
pnpm install
pnpm turbo run build
```

## Code quality

`pnpm install` enables Husky (the `prepare` script). On every commit it runs:

- `pre-commit`: lint-staged (ESLint and Prettier on staged files), then `gitleaks git --pre-commit --staged --redact --verbose`
- `commit-msg`: commitlint with Conventional Commits, e.g. `feat: add login`

Typecheck and tests are not part of the hooks; they run in CI.

```bash
pnpm lint          # ESLint in every package and in the repo root
pnpm lint:fix      # the same with autofix
pnpm format        # Prettier write
pnpm format:check  # Prettier check
```

`.gitleaks.toml` extends the default rules. Never disable a rule. When a dev value in `.env.example` is flagged, allowlist that exact value (`regexes`, limited to `.env.example` with `paths`).

## Layout

- `apps/*` applications (added in later tickets)
- `packages/*` shared packages, e.g. `@certtrack/tsconfig` with `base`, `node`, `nestjs` and `react` TypeScript configs, and `@certtrack/eslint-config` with the `base`, `nestjs` and `react` ESLint presets and import boundaries
- `docs/` specification, ADRs, architecture, requirements and security notes
- `docs/versions.md` pinned tool versions

Turborepo remote cache is disabled; only the local cache is used.
