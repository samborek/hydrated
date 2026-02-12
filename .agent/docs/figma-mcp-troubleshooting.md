# Figma MCP – Freezing / Stuck / Slow

When Figma freezes or feels stuck while using MCP (e.g. from Cursor), try these in order.

---

## 1. **Selection is too large (most common)**

The MCP server runs in Figma and sends the **selected** frame/node. Large or deeply nested frames make it slow or freeze.

**Fix:**

- Select a **smaller part** of the design: e.g. one card, the header, the sidebar, or a single component.
- Avoid selecting the whole page/screen when you only need one section.
- If it freezes, **deselect in Figma**, select a smaller node, then retry in Cursor.

Official note: [Avoid large frames](https://developers.figma.com/docs/figma-mcp-server/avoid-large-frames/)

---

## 2. **Figma app and MCP state**

- **Figma desktop app** must be running and the **file must be open** (the server only runs when a file is active).
- In Figma: switch to **Dev Mode** → find the **MCP** section in the right panel → **Enable** the server.
- Restart **Figma**, then **Cursor**, and try again.

---

## 3. **Connection and Cursor**

- Confirm MCP in Cursor is pointing at the **local** Figma server (e.g. `http://127.0.0.1:3845/mcp` — not HTTPS).
- If you see “lost connection to MCP server”, it’s often the **AI/model** timing out, not Figma. Retry with a **smaller selection** and a clear prompt.
- Close extra Cursor/VS Code windows; restart the MCP server in the editor if needed.

---

## 4. **Token / response size (if you get errors)**

- Very large MCP responses can hit token limits. If your environment has `MAX_MCP_OUTPUT_TOKENS`, try increasing it (e.g. 50k–100k).
- Again: **smaller selection** = smaller response = less chance of freeze or timeout.

---

## 5. **Environment**

- **VPN/proxy**: can cause timeouts; try without or with figma.com whitelisted.
- **Figma app**: update to the latest desktop version.
- For deeper debugging: use **“Figma: Save Debug Information”** (if available in your setup) and share with Figma support.

---

## Quick checklist when Figma freezes

1. Select a **smaller** frame (e.g. one “Featured loop” card, not the whole section).
2. In Figma: **Dev Mode** on → **MCP** enabled.
3. **Restart Figma**, then **Cursor**.
4. Retry the MCP request from Cursor with the smaller selection.

References: [Stuck or slow](https://developers.figma.com/docs/figma-mcp-server/stuck-or-slow/) · [Tools not loading](https://developers.figma.com/docs/figma-mcp-server/tools-not-loading/)
