---
trigger: always_on
glob: **/*
description: Guidelines for maximizing component reuse and maintaining visual consistency.
---

## Component Implementation Workflow

**Step 1: Consult Storybook / Component Index**
Before writing ANY layout or component code, check `packages/ui/src/components` or the component index.
-   **Index Path**: `.agent/docs/component_index.md` (Absolute: `/Users/samborek/Documents/AntigravityTests/hydration-ui/.agent/docs/component_index.md`)
-   **Goal**: Find an existing component that solves the problem.
-   **Example**: Need a group of filter buttons? Check for `ToggleGroup`. Need a chart? Check for `Chart`.

**Step 2: Check Theme Tokens**
If no component exists, ensure all primitive styling uses theme tokens.
-   Colors: `theme.surfaces.*, `theme.text.*`
-   Spacing: `theme.containers.paddings.*`
-   Borders: `theme.details.borders`, `theme.details.separators`

**Step 3: Reference Existing Modules**
Look at `wallet` or `liquidity` modules for usage patterns of these components.
