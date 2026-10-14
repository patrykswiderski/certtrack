# ADR 0001: Self-hosted S3 storage

Status: Draft (to be accepted by the author)

## Context

TODO (author, 3-5 sentences): why the project needs an S3-compatible store, what the constraints are (free, self-hosted, same server locally, in tests and on the demo, AWS SDK v3 only, private bucket with presigned POST and GET).

## Decision

TODO (author, 3-5 sentences): chosen server and why. Suggested candidate: Garage, single node, pinned image `dxflrs/garage`.

## Comparison

| Criterion                   | Garage v2.4                                      | SeaweedFS                                   | RustFS                     | MinIO                               |
| --------------------------- | ------------------------------------------------ | ------------------------------------------- | -------------------------- | ----------------------------------- |
| License                     | AGPL-3.0 (used unmodified as a separate service) | Apache-2.0                                  | Apache-2.0                 | Open-source repo archived (2026-04) |
| Official image              | `dxflrs/garage` (author)                         | `chrislusf/seaweedfs` (author)              | `rustfs/rustfs` (author)   | No official images since 2025-10    |
| Presigned POST (PostObject) | Implemented                                      | Implemented                                 | Not verified               | n/a                                 |
| Presigned GET/PUT URLs      | Implemented                                      | Implemented                                 | Not verified               | n/a                                 |
| CORS (Put/GetBucketCors)    | Implemented                                      | Implemented                                 | Not verified               | n/a                                 |
| Bucket policy and ACL       | Missing (own per-key permissions)                | Partial                                     | Not verified               | n/a                                 |
| Local single-node setup     | One container, `--single-node --default-bucket`  | Master + volume + filer (several processes) | One container              | n/a                                 |
| Maturity                    | Stable v2.x                                      | Production proven                           | 1.0 release candidates     | n/a                                 |
| Memory footprint            | Low (Rust, small)                                | Medium                                      | Low                        | n/a                                 |
| arm64 image                 | To verify before accepting                       | To verify before accepting                  | To verify before accepting | n/a                                 |

## Consequences

- The app talks to storage only through AWS SDK v3, so switching to real S3 or another server is a configuration change (`S3_ENDPOINT`, `S3_PUBLIC_ENDPOINT`, credentials).
- Garage has no bucket policies or ACLs, so privacy relies on its per-key permissions and presigned URLs. This is enough for a private bucket.
- AGPL does not affect the project because Garage runs unmodified as a separate service.

## Sources

- Garage S3 compatibility: https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/
- Garage quick start (single node): https://garagehq.deuxfleurs.fr/documentation/quick-start/
- SeaweedFS S3 API: https://github.com/seaweedfs/seaweedfs/wiki/Amazon-S3-API
- Comparison article: https://blog.elest.io/rustfs-vs-seaweedfs-vs-garage-which-minio-alternative-should-you-pick/
