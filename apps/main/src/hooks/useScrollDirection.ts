import { useEffect, useRef, useState } from "react"

type ScrollDirection = "up" | "down" | null

export const useScrollDirection = (threshold = 10, scrollStopDelay = 150) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      // Check if at top
      setIsAtTop(scrollY < threshold)

      // Only update direction if we've scrolled more than threshold
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      // If scrolling up, only show header if we're near the top
      if (scrollY < lastScrollY) {
        if (scrollY < threshold * 2) {
          setScrollDirection("up")
        }
      } else {
        setScrollDirection("down")
      }

      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      // Mark as scrolling
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to detect scroll stop
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, scrollStopDelay)

      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [threshold, scrollStopDelay])

  return { scrollDirection, isAtTop, isScrolling }
}
