---
name: wp-module-help-center
title: Dependencies
description: Composer and npm dependencies.
updated: 2026-08-12
---

# Dependencies

**Runtime:** newfold-labs/wp-module-ai, newfold-labs/wp-module-data, newfold-labs/wp-module-features, typesense/typesense-php. **Dev:** newfold-labs/wp-php-standards, wp-cli/i18n-command, johnpbloch/wordpress, lucatume/wp-browser, phpunit/phpcov.

## npm `overrides` policy

`package.json` pins a few transitive packages that upstream tooling holds at a
vulnerable version. Each entry exists to close a Dependabot alert that cannot be
resolved by bumping a direct dependency, so **every override needs a reason**:

| Override | Closes | Held back by |
|---|---|---|
| `tar-fs` | path traversal | `puppeteer-core` |
| `qs` | arrayLimit bypass, `stringify` DoS | `express`, `body-parser` |
| `adm-zip` | 4GB alloc on crafted ZIP | `@wordpress/env`, `@wordpress/scripts` |
| `serialize-javascript` | RCE via `RegExp.flags` | `copy-webpack-plugin` |
| `uuid` | missing buffer bounds check | `sockjs` |
| `@hono/node-server` | encoded-backslash path traversal | `@modelcontextprotocol/sdk` |
| `markdownlint-cli` (scoped) | ReDoS / quadratic-complexity DoS | `markdownlint` pins `markdown-it` exactly |

Guidelines when touching this block:

- **Scope the override to the parent** (the nested object form) when other copies
  in the tree are already healthy — a global key would drag them along too. The
  `markdownlint-cli` entry is scoped for exactly this reason: `minimatch` 9.x/10.x
  elsewhere is fine and must not be forced down to 3.x.
- **Prefer `~` over `^`** where the parent declares a tilde range. `qs` is pinned
  `~6.15.3` because `express`/`body-parser` declare `~6.15.1` (i.e. `<6.16.0`);
  a caret would silently force a 6.16.x they exclude, and overrides suppress the
  usual peer warning.
- **Verify against the call site, not just the version.** These overrides
  intentionally cross major versions, so check the API the consumer actually
  invokes still exists and behaves the same before merging.
- **Delete entries that no longer match anything.** npm ignores unmatched keys,
  so a stale pin is invisible until the package returns at a pinned-vulnerable
  version.

## Known accepted risks

Two Dependabot findings are knowingly not fixed here:

- **`@opentelemetry/core` (<2.8.0, 17 moderate).** Dev-only, reached via
  `lighthouse` → `@sentry/node` under `@wordpress/scripts`. Three packages pin it
  at exactly `1.30.1`; forcing 2.x breaks `@sentry/node` at load. Needs an
  upstream `@wordpress/scripts` release on a newer lighthouse.
- **`dompurify` in the shipped bundle.** `@newfold/wp-module-ai-chat` ships a
  prebuilt `build/index.js` with dompurify **3.4.7 inlined**, so the hoisted copy
  in our lockfile is not the one that executes. A green `npm audit` does **not**
  mean the shipped bundle is clean. Fixing this requires an upstream release of
  `newfold-labs/wp-module-ai-chat` rebuilt against dompurify >= 3.4.13.
