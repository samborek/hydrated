---
description: Recommended workflow for pushing changes to the repository.
---

1. Ensure all changes are committed locally.
2. Run the full build check for the main app to catch type errors and missing artifacts:
   ```bash
   yarn turbo run build --filter=@galacticcouncil/main
   ```
3. If the build passes, push the current branch:
   ```bash
   git push origin <branch-name>
   ```
4. If the build fails, resolve the reported errors before attempting to push again.
