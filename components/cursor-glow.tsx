"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const glow = glowRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    if (!glow || !ring || !dot) return

    const handleMouseMove = (e: MouseEvent) => {
      // Smooth glow follow
      gsap.to(glow, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      })

      // Snappy ring follow
      gsap.to(ring, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      })

      // Instant dot follow
      gsap.set(dot, {
        left: e.clientX,
        top: e.clientY,
      })
    }

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".group") // Interactive cards
      ) {
        setIsHovering(true)
        gsap.to(ring, {
          width: 48,
          height: 48,
          duration: 0.3,
          ease: "power2.out",
        })
        gsap.to(dot, {
          width: 6,
          height: 6,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      gsap.to(ring, {
        width: 32,
        height: 32,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(dot, {
        width: 4,
        height: 4,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <>
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="fixed w-80 h-80 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(224, 90, 0, 0.08) 0%, rgba(224, 90, 0, 0.02) 50%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Ring cursor with mix-blend-difference */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[100001] rounded-full"
        style={{
          width: 32,
          height: 32,
          border: "1.5px solid white",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference", // This ensures it inverts colors (white on black, black on white)
        }}
      />

      {/* Center dot with mix-blend-difference */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[100001] rounded-full"
        style={{
          width: 4,
          height: 4,
          backgroundColor: "white",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference", // This ensures it inverts colors
        }}
      />
    </>
  )
}
