"use client"

import { useEffect, useRef } from "react"

interface AnimatedNoiseProps {
  opacity?: number
  className?: string
}

export function AnimatedNoise({ opacity = 0.05, className }: AnimatedNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let frame = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth / 2
      canvas.height = canvas.offsetHeight / 2
    }

    // OPTIMIZATION: Generate noise once and pan it around
    const generateNoisePattern = () => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 256
      offscreen.height = 256
      const offCtx = offscreen.getContext("2d")
      if (!offCtx) return null

      const imageData = offCtx.createImageData(256, 256)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }
      offCtx.putImageData(imageData, 0, 0)
      return offscreen
    }

    const noisePatternCanvas = generateNoisePattern()

    const animate = () => {
      frame++
      // Update noise every 3 frames for performance
      if (frame % 3 === 0 && noisePatternCanvas) {
        const pattern = ctx.createPattern(noisePatternCanvas, "repeat")
        if (pattern) {
          ctx.fillStyle = pattern
          const offsetX = Math.random() * 256
          const offsetY = Math.random() * 256
          ctx.save()
          ctx.translate(offsetX, offsetY)
          ctx.fillRect(-offsetX, -offsetY, canvas.width + 256, canvas.height + 256)
          ctx.restore()
        }
      }
      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  )
}
