"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  seconds: number
  onComplete: () => void
  onTick?: () => void
}

export function CountdownTimer({ seconds, onComplete, onTick }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
      if (onTick) onTick()
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onComplete, onTick])

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24 bg-[#1a1a2e] border-4 border-[#ffd700]">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-5xl font-pixel text-[#ffd700]">{timeLeft}</span>
        </div>
      </div>
    </div>
  )
}
