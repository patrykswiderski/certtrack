# ADR 0002: Valkey instead of Redis

Status: Accepted

## Context

The spec (section 8) allows Valkey instead of Redis after checking compatibility. Redis 8 is licensed under AGPLv3, RSALv2 or SSPLv1. Valkey is a BSD-3-Clause fork of Redis 7.2.4 under the Linux Foundation. It speaks the same RESP2/RESP3 protocol, so ioredis and BullMQ connect unchanged.

## Decision

Use `valkey/valkey` (pinned version and digest) as the queue and session store in Compose. Application code keeps using Redis clients and the `REDIS_*`-style configuration.

## Consequences

- No license risk for the public demo.
- RDB files written by Redis 7.4+ do not load in Valkey, so there is no data migration path from newer Redis. This is irrelevant for a fresh dev environment.
- Redis Insight (profile `tools`) works with Valkey.
- Before M1 re-check that every BullMQ feature used (Job Schedulers, rate limiting) works against the pinned Valkey version in integration tests.
