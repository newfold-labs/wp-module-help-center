---
name: wp-module-help-center
title: Integration
description: How the module registers and integrates.
updated: 2025-03-18
---

# Integration

The module registers with the Newfold Module Loader via bootstrap.php. The host plugin typically registers a help center service; the module uses Typesense for search. See [dependencies.md](dependencies.md).
