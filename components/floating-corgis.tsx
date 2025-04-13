"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingCorgi {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingCorgis() {
  const [corgis, setCorgis] = useState<FloatingCorgi[]>([])

  useEffect(() => {
    // Generate random floating corgis
    const newCorgis: FloatingCorgi[] = []
    const count = window.innerWidth < 768 ? 5 : 10

    for (let i = 0; i < count; i++) {
      newCorgis.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }

    setCorgis(newCorgis)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {corgis.map((corgi) => (
        <motion.div
          key={corgi.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: corgi.size,
            height: corgi.size,
            left: `${corgi.x}%`,
            top: `${corgi.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: corgi.duration,
            delay: corgi.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-[url('/placeholder.svg?height=50&width=50')] bg-cover bg-center rounded-full opacity-70">
            {/* This would be replaced with actual corgi silhouette images */}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
