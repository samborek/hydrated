---
description: git push policy - avoid frequent pushes
---

## Git Push Policy

**DO NOT auto-push to git after every code change.**

- Only push when explicitly asked by the user
- Or when a significant milestone/feature is complete but then ask 
- Bundle multiple related changes into a single commit when possible
- **AWhen asked for Gith Push - run `yarn workspace @galacticcouncil/main build`** before pushing to ensure type safety and build success. This prevents Vercel build failures.