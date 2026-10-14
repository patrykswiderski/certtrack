# Pinned versions

| Package | Version | Date | Reason |
| --- | --- | --- | --- |
| node | 24 (LTS) | 2026-10-14 | Required by CT-001; `engines.node` is `>=24 <25`, `.nvmrc` is `24` |
| pnpm | 12.11.2 | 2026-10-14 | Latest release; pinned through `packageManager` |
| turbo | 2.11.8 | 2026-10-14 | Latest stable release |
| typescript | 6.0.3 | 2026-10-14 | Latest 6.x; typescript-eslint (CT-002) does not support TypeScript 7 yet |
| @types/node | 24.19.2 | 2026-10-14 | Matches the Node 24 runtime; added with the first Node app |
