import { Component, ErrorInfo, ReactNode } from "react"

const RETRY_KEY = "theme-ui-retry-count"
const MAX_RETRIES = 1

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

/**
 * Error boundary that catches Theme UI/Emotion runtime errors
 * and auto-retries once before showing a fallback UI.
 *
 * These errors occur on mobile when the styling runtime isn't
 * loaded before components try to render.
 */
export class RuntimeErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("RuntimeErrorBoundary caught error:", error, errorInfo)

        // Check if this is a Theme UI/Emotion runtime error
        const isRuntimeError =
            error.message.includes("f is not a function") ||
            error.message.includes("'f' is undefined") ||
            error.message.includes("jsx") ||
            error.message.includes("css")

        if (isRuntimeError) {
            const retryCount = parseInt(
                localStorage.getItem(RETRY_KEY) || "0",
                10,
            )

            if (retryCount < MAX_RETRIES) {
                // Increment retry count and reload
                localStorage.setItem(RETRY_KEY, String(retryCount + 1))
                console.log(`Auto-retrying (attempt ${retryCount + 1})...`)
                window.location.reload()
                return
            }
        }

        // If not a runtime error or max retries reached, clear the counter
        localStorage.removeItem(RETRY_KEY)
    }

    handleReload = () => {
        localStorage.removeItem(RETRY_KEY)
        window.location.reload()
    }

    handleClearAndReload = () => {
        // Clear all caches
        localStorage.clear()
        sessionStorage.clear()
        if ("caches" in window) {
            caches.keys().then((names) => {
                names.forEach((name) => caches.delete(name))
            })
        }
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI - using inline styles since Theme UI might not work
            return (
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#030816",
                        color: "#fff",
                        fontFamily: "system-ui, sans-serif",
                        padding: 20,
                        textAlign: "center",
                    }}
                >
                    <h1 style={{ fontSize: 32, marginBottom: 16 }}>
                        Something went wrong 😞
                    </h1>
                    <p
                        style={{
                            color: "#999",
                            maxWidth: 400,
                            marginBottom: 24,
                            lineHeight: 1.5,
                        }}
                    >
                        The app failed to load. This sometimes happens on mobile devices.
                        Please try reloading.
                    </p>
                    {this.state.error && (
                        <p
                            style={{
                                color: "#f87171",
                                fontSize: 12,
                                maxWidth: 400,
                                marginBottom: 24,
                                padding: 12,
                                backgroundColor: "rgba(248, 113, 113, 0.1)",
                                borderRadius: 8,
                            }}
                        >
                            {this.state.error.message}
                        </p>
                    )}
                    <div style={{ display: "flex", gap: 12 }}>
                        <button
                            onClick={this.handleReload}
                            style={{
                                padding: "12px 24px",
                                fontSize: 16,
                                backgroundColor: "#4f46e5",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                        >
                            Reload page
                        </button>
                        <button
                            onClick={this.handleClearAndReload}
                            style={{
                                padding: "12px 24px",
                                fontSize: 16,
                                backgroundColor: "transparent",
                                color: "#999",
                                border: "1px solid #333",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                        >
                            Clear cache & reload
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
