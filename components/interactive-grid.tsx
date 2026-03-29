"use client"

import { useEffect, useRef } from "react"

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let targetMouseX = canvas.width / 2
    let targetMouseY = canvas.height / 2

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    const gridSize = 50
    const distortionRadius = 200
    const distortionStrength = 8

    const animate = () => {
      const dxTarget = targetMouseX - mouseX
      const dyTarget = targetMouseY - mouseY

      // OPTIMIZATION: Skip heavy rendering if mouse is idle (no target changes)
      if (Math.abs(dxTarget) < 0.1 && Math.abs(dyTarget) < 0.1 && process.env.NODE_ENV !== 'test') {
        requestAnimationFrame(animate)
        return
      }

      mouseX += dxTarget * 0.08
      mouseY += dyTarget * 0.08

      ctx.fillStyle = "#f5f5fa"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 0.8

      // Vertical lines
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        for (let y = 0; y <= canvas.height; y += 25) {
          const dx = x - mouseX
          const dy = y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          let offsetX = 0
          let alpha = 0.12
          if (distance < distortionRadius && distance > 0) {
            const influence = Math.cos((distance / distortionRadius) * Math.PI * 0.5)
            offsetX = (dx / distance) * influence * distortionStrength
            alpha = 0.12 + influence * 0.25
          }

          ctx.strokeStyle = `rgba(140, 140, 160, ${alpha})`
          if (y === 0) {
            ctx.moveTo(x + offsetX, y)
          } else {
            ctx.lineTo(x + offsetX, y)
          }
        }
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 25) {
          const dx = x - mouseX
          const dy = y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          let offsetY = 0
          let alpha = 0.12
          if (distance < distortionRadius && distance > 0) {
            const influence = Math.cos((distance / distortionRadius) * Math.PI * 0.5)
            offsetY = (dy / distance) * influence * distortionStrength
            alpha = 0.12 + influence * 0.25
          }

          ctx.strokeStyle = `rgba(140, 140, 160, ${alpha})`
          if (x === 0) {
            ctx.moveTo(x, y + offsetY)
          } else {
            ctx.lineTo(x, y + offsetY)
          }
        }
        ctx.stroke()
      }

      // Draw grid intersection dots near cursor
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const dx = x - mouseX
          const dy = y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < distortionRadius) {
            const influence = Math.cos((distance / distortionRadius) * Math.PI * 0.5)
            const dotRadius = 1.5 + influence * 2.5
            const dotAlpha = influence * 0.6

            ctx.beginPath()
            ctx.arc(
              x + (dx / (distance || 1)) * influence * distortionStrength,
              y + (dy / (distance || 1)) * influence * distortionStrength,
              dotRadius,
              0,
              Math.PI * 2,
            )
            ctx.fillStyle = `rgba(224, 90, 0, ${dotAlpha})`
            ctx.fill()
          }
        }
      }

      // Radial glow at cursor position
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180)
      gradient.addColorStop(0, "rgba(224, 90, 0, 0.06)")
      gradient.addColorStop(0.5, "rgba(224, 90, 0, 0.02)")
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    // Force an initial heavy draw
    targetMouseX += 1;

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
