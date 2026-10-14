# CertTrack

Monorepo managed with pnpm workspaces and Turborepo.

## Requirements

- Node.js 24 LTS (see `.nvmrc`; with fnm run `fnm use 24`)
- pnpm 12.x, installed directly. Corepack is not bundled with Node from version 25, so it is not used here:

  ```bash
  npm install --global pnpm@12.11.2
  ```

## Getting started

```bash
pnpm install
pnpm turbo run build
```

## Layout

- `apps/*` applications (added in later tickets)
- `packages/*` shared packages, e.g. `@certtrack/tsconfig` with `base`, `node`, `nestjs` and `react` TypeScript configs
- `docs/` specification, ADRs, architecture, requirements and security notes
- `docs/versions.md` pinned tool versions

Turborepo remote cache is disabled; only the local cache is used.
