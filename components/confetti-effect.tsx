"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiEffectProps {
  duration?: number
}

export function ConfettiEffect({ duration = 3000 }: ConfettiEffectProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3"
          style={{
            backgroundColor: [
              "#FFD700",
              "#FF8C00",
              "#FF1493",
              "#9400D3",
              "#4B0082",
              "#00BFFF",
              "#00FF7F",
              "#ADFF2F",
              "#FF4500",
              "#FF00FF",
            ][Math.floor(Math.random() * 10)],
            top: `${Math.random() * 20}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20, opacity: 1 }}
          animate={{
            y: window.innerHeight,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
