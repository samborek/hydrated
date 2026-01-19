import { useEffect, useId, useRef, useState } from "react"
import styled from "@emotion/styled"

const SContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const SSceneWrapper = styled.div`
  position: absolute;
  width: 1440px;
  height: 900px;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  pointer-events: none;

  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
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

export const HalftoneShader: React.FC<HalftoneShaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<UnicornScene | null>(null)
  const elementId = useId().replace(/:/g, "")

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    // Load Unicorn Studio SDK
    const loadSDK = async () => {
      if (!window.UnicornStudio) {
        const existing = document.querySelector<HTMLScriptElement>(
          'script[data-unicornstudio-sdk="true"]',
        )
        const script =
          existing ??
          Object.assign(document.createElement("script"), {
            src: "/unicornStudio.umd.js",
            async: true,
          })

        if (!existing) {
          script.setAttribute("data-unicornstudio-sdk", "true")
          document.head.appendChild(script)
        }

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve()
          script.onerror = () =>
            reject(new Error("Failed to load Unicorn Studio SDK"))
        })
      }

      if (!window.UnicornStudio) {
        console.error("Unicorn Studio SDK not available")
        return
      }

      try {
        const scene = await window.UnicornStudio.addScene({
          elementId,
          fps: 60,
          scale: 1,
          dpi: 1.5,
          filePath: "/halftone-effect.json",
          interactivity: {
            mouse: {
              disableMobile: true,
              disabled: true,
            },
          },
        })

        sceneRef.current = scene
      } catch (err) {
        console.error("Failed to initialize Unicorn Studio scene:", err)
      }
    }

    loadSDK()

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
      ro.disconnect()
      if (sceneRef.current) {
        sceneRef.current.destroy()
        sceneRef.current = null
      }
    }
  }, [elementId])

  return (
    <SContainer ref={containerRef} className={className}>
      <SSceneWrapper id={elementId} ref={wrapperRef} />
    </SContainer>
  )
}
