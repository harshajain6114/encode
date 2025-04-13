"use client"

import { useEffect, useRef } from "react"

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Grid properties
    const gridSize = 32
    const gridColor = "rgba(200, 200, 220, 0.5)"

    // Pixel decorations
    const decorations: Decoration[] = []
    const decorationCount = Math.min(30, Math.floor(window.innerWidth / 60))

    interface Decoration {
      x: number
      y: number
      type: "star" | "plus"
      color: string
      size: number
      rotation: number
    }

    // Create decorations
    for (let i = 0; i < decorationCount; i++) {
      decorations.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: Math.random() > 0.5 ? "star" : "plus",
        color: Math.random() > 0.5 ? "#ffd700" : "#ff6b6b",
        size: Math.random() * 10 + 10,
        rotation: Math.random() * Math.PI * 2,
      })
    }

    // Draw a pixel star
    const drawStar = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillStyle = color

      // Simple pixel star
      ctx.fillRect(-size / 2, -size / 6, size, size / 3)
      ctx.fillRect(-size / 6, -size / 2, size / 3, size)

      ctx.restore()
    }

    // Draw a pixel plus
    const drawPlus = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillStyle = color

      // Simple pixel plus
      ctx.fillRect(-size / 2, -size / 6, size, size / 3)
      ctx.fillRect(-size / 6, -size / 2, size / 3, size)

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw decorations
      decorations.forEach((decoration) => {
        if (decoration.type === "star") {
          drawStar(decoration.x, decoration.y, decoration.size, decoration.color, decoration.rotation)
        } else {
          drawPlus(decoration.x, decoration.y, decoration.size, decoration.color, decoration.rotation)
        }

        // Slowly rotate decorations
        decoration.rotation += 0.001
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[#f0f0f8]"></div>
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </div>
  )
}
