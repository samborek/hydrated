import { useEffect, useRef, useState, useCallback } from "react"
import styled from "@emotion/styled"

const SContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  border-radius: inherit;
  clip-path: inset(0);
  contain: strict;
`

const SSceneWrapper = styled.div`
  position: absolute;
  width: 1440px;
  height: 900px;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  pointer-events: none;
  will-change: transform;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
    background: transparent;
    image-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
`

interface HalftoneShaderProps {
  className?: string
}

// Unicorn Studio scene type
interface UnicornScene {
  destroy: () => void
  resize: () => void
  paused: boolean
}

// Unicorn Studio SDK type
interface UnicornStudioSDK {
  addScene: (options: {
    elementId?: string
    fps?: number
    scale?: number
    dpi?: number
    filePath?: string
    projectId?: string
    lazyLoad?: boolean
    interactivity?: {
      mouse?: {
        disableMobile?: boolean
        disabled?: boolean
      }
    }
  }) => Promise<UnicornScene>
  destroy: () => void
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioSDK
  }
}

// Check if WebGL is available
const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    return gl !== null
  } catch {
    return false
  }
}

// Unique ID generator that's stable across re-renders but unique per mount
let instanceCounter = 0

export const HalftoneShader: React.FC<HalftoneShaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<UnicornScene | null>(null)
  const initAttemptRef = useRef(0)
  const [instanceId] = useState(() => `halftone-${++instanceCounter}`)
  const [isReady, setIsReady] = useState(false)
  const mountedRef = useRef(true)

  const elementId = `unicorn-scene-${instanceId}`

  const isMobile =
    typeof navigator !== "undefined" &&
    (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (typeof window !== "undefined" && window.innerWidth < 768))

  const initScene = useCallback(async () => {
    const wrapper = wrapperRef.current
    if (!wrapper || !mountedRef.current) return false

    // Check WebGL support
    if (!isWebGLAvailable()) {
      console.warn("WebGL not available on this device")

      return false
    }

    try {
      // Clear any existing content
      wrapper.innerHTML = ""

      // Wait for SDK to be ready
      if (!window.UnicornStudio) {
        // Load the SDK if not already loaded
        const existing = document.querySelector<HTMLScriptElement>(
          'script[data-unicornstudio-sdk="true"]',
        )

        if (!existing) {
          const script = document.createElement("script")
          script.src = "/unicornStudio.umd.js"
          script.async = true
          script.setAttribute("data-unicornstudio-sdk", "true")
          document.head.appendChild(script)

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve()
            script.onerror = () => reject(new Error("Failed to load SDK"))
          })
        } else {
          // Wait a bit for SDK to initialize
          await new Promise((r) => setTimeout(r, 100))
        }
      }

      if (!window.UnicornStudio || !mountedRef.current) {
        console.error("Unicorn Studio SDK not available")
        return false
      }

      // Determine optimal settings for device
      const devicePixelRatio = window.devicePixelRatio || 1
      let targetDpi = 1.2
      if (devicePixelRatio >= 3) {
        targetDpi = Math.min(2.0, devicePixelRatio * 0.7)
      } else if (devicePixelRatio >= 2) {
        targetDpi = Math.min(1.8, devicePixelRatio * 0.8)
      }

      // Lower settings for mobile
      const targetFps = isMobile ? 24 : 60
      const targetScale = isMobile ? 0.8 : 1

      const scene = await window.UnicornStudio.addScene({
        elementId,
        fps: targetFps,
        scale: targetScale,
        dpi: targetDpi,
        filePath: "/halftone-effect.json",
        interactivity: {
          mouse: {
            disableMobile: true,
            disabled: true,
          },
        },
      })

      if (!mountedRef.current) {
        // Component unmounted during init, clean up
        try {
          scene.destroy()
        } catch { }
        return false
      }

      sceneRef.current = scene
      setIsReady(true)

      return true
    } catch (err) {
      console.error("Failed to initialize Unicorn Studio scene:", err)
      if (mountedRef.current) {

      }
      return false
    }
  }, [elementId, isMobile])

  useEffect(() => {
    mountedRef.current = true
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    // Reset state
    setIsReady(false)

    initAttemptRef.current = 0

    // Small delay before init to ensure DOM is ready
    const initTimer = setTimeout(async () => {
      const maxAttempts = isMobile ? 3 : 1

      for (let i = 0; i < maxAttempts && mountedRef.current; i++) {
        initAttemptRef.current = i + 1
        const success = await initScene()
        if (success) break

        // Wait before retry on mobile
        if (i < maxAttempts - 1) {
          await new Promise((r) => setTimeout(r, 500))
        }
      }
    }, isMobile ? 200 : 50)

    // Handle scaling to cover
    const handleResize = () => {
      if (!container || !wrapper) return
      const cw = container.clientWidth
      const ch = container.clientHeight
      const tw = 1440
      const th = 900

      const scale = Math.max(cw / tw, ch / th)
      wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)
    handleResize()

    return () => {
      mountedRef.current = false
      clearTimeout(initTimer)
      ro.disconnect()

      if (sceneRef.current) {
        try {
          sceneRef.current.destroy()
        } catch (e) {
          console.warn("Error destroying scene:", e)
        }
        sceneRef.current = null
      }

      // Clear wrapper contents
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = ""
      }
    }
  }, [initScene, isMobile])

  return (
    <SContainer ref={containerRef} className={className}>
      <SSceneWrapper
        id={elementId}
        ref={wrapperRef}
        style={{
          // Hide wrapper until ready to prevent white flash
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      {/* Show nothing while loading - background shows through */}
    </SContainer>
  )
}
