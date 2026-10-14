# ADR 0003: Moto instead of LocalStack

Status: Accepted

## Context

The spec (sections 8, 11, 14) names LocalStack for the `aws` profile, used only for SES (CT-122) and later SQS (module B). Since release 2026.03 the LocalStack image requires `LOCALSTACK_AUTH_TOKEN` (free Hobby plan, non-commercial use only). That means an external account, a secret in `.env` and in CI, and a licence limit for a public demo repository.

## Decision

Use `motoserver/moto` (Apache-2.0, pinned version and digest) in the `aws` profile. It needs no account or token. SES operations used by the project (`verify_email_identity`, `list_identities`, `send_email`, `send_raw_email`) are implemented in Moto's SES backend. A one-shot `aws-init` container verifies the sender `no-reply@certtrack.local`, replacing LocalStack's `ready.d` script.

## Consequences

- No account, token or CI secret; `core` and `aws` both start offline.
- Endpoint changes from `http://localhost:4566` to `http://localhost:5000`; code uses the standard `AWS_ENDPOINT_URL` or SDK `endpoint` option, so this stays configuration.
- Moto has no persistence and no built-in ready hook; state is lost on restart, which is fine for dev and tests.
- Moto's SES backend keeps sent messages only in memory, readable through the Python-only `ses_backends` object (checked in moto 5.2.4 `ses/models.py`; no HTTP route for them was found in `moto_api/_internal/urls.py`). From Node tests you can assert only that `SendEmail` succeeded (`MessageId`), not the message content. LocalStack offered an HTTP endpoint for this. Use Mailpit via the SMTP transport when content must be asserted.
- `send_email` is rejected unless the source address or its domain is verified (`MessageRejectedError`), so the `aws-init` verification is required.
- Healthcheck: the image is based on the official Python image with `/usr/local/bin` on `PATH`, binds `0.0.0.0` through its entrypoint and has no built-in healthcheck. The `/moto-api/` dashboard route exists in source. Verified on a running container (2026-10-14): `/moto-api/` returns HTTP 200, the container reaches `healthy`, and `aws-init` registered `no-reply@certtrack.local`.
- Spec sections 8, 11 and 14 and ticket CT-003 still mention LocalStack and need a follow-up edit.
- Fallback if Moto lacks a needed SES or SQS behaviour: Floci (MIT) or LocalStack with a Hobby token.

## Sources

- Moto server mode: https://docs.getmoto.org/en/latest/docs/server_mode.html
- Moto SES coverage: https://docs.getmoto.org/en/latest/docs/services/ses.html
- LocalStack single image and auth token: https://blog.localstack.cloud/localstack-single-image-next-steps/
