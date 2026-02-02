import styled from "@emotion/styled"
import { jsx, jsxs } from "@theme-ui/core/jsx-runtime"
import { Buffer } from "buffer"
globalThis.Buffer = Buffer

import { patchBigJs } from "@galacticcouncil/utils"
import Big from "big.js"
import { enableMapSet } from "immer"
import { createRoot } from "react-dom/client"

import { App } from "./App"

const RUNTIME_GUARD_KEY = "theme-ui-runtime-guard"
const RUNTIME_GUARD_MAX_RETRIES = 2

const isThemeUiRuntimeReady =
    typeof styled === "function" &&
    typeof jsx === "function" &&
    typeof jsxs === "function"

enableMapSet()
patchBigJs()
Big.PE = 666

if (!isThemeUiRuntimeReady) {
    const retryCount = Number(localStorage.getItem(RUNTIME_GUARD_KEY) ?? "0")

    console.error("Theme UI runtime guard failed", {
        retryCount,
        styledType: typeof styled,
        jsxType: typeof jsx,
        jsxsType: typeof jsxs,
        userAgent: navigator.userAgent,
    })

    if (retryCount < RUNTIME_GUARD_MAX_RETRIES) {
        localStorage.setItem(RUNTIME_GUARD_KEY, String(retryCount + 1))
        window.location.reload()
    } else {
        localStorage.removeItem(RUNTIME_GUARD_KEY)
        document.body.innerHTML =
            '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#030816;color:#fff;font-family:system-ui,sans-serif;padding:20px;text-align:center"><div><h1 style="font-size:28px;margin-bottom:12px">Something went wrong</h1><p style="color:#999;max-width:360px;line-height:1.5">The app failed to initialize. Please clear cache and reload.</p></div></div>'
    }
} else {
    localStorage.removeItem(RUNTIME_GUARD_KEY)
    createRoot(document.getElementById("root")!).render(<App />)
}
