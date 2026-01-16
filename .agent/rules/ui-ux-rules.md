# UI/UX Style Guide

## Dropdowns vs Tabs (Buttons)

When designing controls for selecting options (like Time Frame, View Mode, etc.), adhere to the following rules:

1.  **Use Tabs/Buttons (ToggleGroup)** if:
    *   The list of options is short (<= 6 items).
    *   The items fit comfortably within the available space (especially on mobile).
    *   Example: Time Ranges (1W, 1M, 1Y), View Modes (Revenue, Fees).

2.  **Use Dropdown (Select)** if:
    *   The list of options is long (> 6 items).
    *   There are multiple complex controls competing for space, making buttons hard to fit.
    *   The item labels are long and would cause wrapping or layout breakage as buttons.
    *   **Exception:** If a toolbar contains **3 or more separate controls** (e.g., Filter + Chart Type + Time Range), use Dropdowns for all selection controls (including Time Range) to allow them to fit on a single line or grouped compactly on mobile.

## Mobile Layout

*   Buttons (ToggleGroup items) should utilize `flex: 1` to fill the available width evenly.
*   Container should allow controls to stretch (`width: 100%`).
