---
trigger: always_on
---

## Git Push Policy

**DO NOT auto-push to git after every code change.**

- Only push when explicitly asked by the user - and then push only single time upon request, without continuit
- Or when a significant milestone/feature is complete but then ask 
- Bundle multiple related changes into a single commit when possible
- **When asked for Git Push - run `yarn turbo run build --filter=@galacticcouncil/main`** before pushing to ensure type safety and build success. This matches Vercel's build process and prevents deployment failures.