# Claude Code Rules

## Git

- Only run `git push` when explicitly asked. Commit freely, but never push automatically after finishing a task.
- Before pushing, always run a fresh uncached build to catch errors Vercel would catch: `pnpm turbo run build --filter=@galacticcouncil/main --force`. Only push if it passes.
