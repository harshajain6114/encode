"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Home } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { CountdownTimer } from "@/components/countdown-timer"
import { PixelBackground } from "@/components/pixel-background"
import { PixelButton } from "@/components/pixel-button"
import { SoundToggle } from "@/components/sound-toggle"
import Link from "next/link"

export default function MysteryPackPage() {
  const router = useRouter()
  const [isOpening, setIsOpening] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCountdownRunning, setIsCountdownRunning] = useState(true)
  const { playSound, stopSound } = useSound()

  // Play background sound when countdown is running
  useEffect(() => {
    if (isCountdownRunning) {
      playSound("countdown-loop", true)
    }

    return () => {
      stopSound("countdown-loop")
    }
  }, [isCountdownRunning, playSound, stopSound])

  const handleOpenPack = useCallback(() => {
    setIsCountdownRunning(false)
    setIsOpening(true)
    playSound("chest-open")

    // Simulate chest opening animation time
    setTimeout(() => {
      setIsRevealed(true)
      playSound("success")
    }, 2000)
  }, [playSound])

  const handleContinue = useCallback(() => {
    playSound("button-click")
    router.push("/cards")
  }, [playSound, router])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f0f0f8]">
      {/* Pixel art background */}
      <PixelBackground />

      {/* Sound toggle */}
      <div className="absolute top-4 right-4 z-50">
        <SoundToggle />
      </div>

      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <PixelButton
            onClick={() => playSound("button-click")}
            className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] w-10 h-10 p-0 flex items-center justify-center"
          >
            <Home className="h-5 w-5" />
          </PixelButton>
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-pixel text-[#1a1a2e] mb-6 tracking-wider">MYSTERY PACK</h1>

        {!isOpening && (
          <div className="mb-8">
            <CountdownTimer seconds={5} onComplete={handleOpenPack} onTick={() => playSound("timer-tick")} />
            <p className="text-[#1a1a2e] font-pixel mt-2 bg-white/70 p-2 border-4 border-[#1a1a2e]">
              YOUR PACK IS ABOUT TO OPEN...
            </p>
          </div>
        )}

        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80"
          initial={{ scale: 1 }}
          animate={{
            scale: isOpening ? [1, 1.1, 0.9, 1.05, 1] : 1,
            rotateY: isOpening ? [0, 180] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {!isRevealed ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className={`relative w-full h-full bg-[#1a1a2e] border-8 border-[#ffd700] flex items-center justify-center ${isOpening ? "animate-shake" : "animate-pulse-slow"}`}
              >
                {/* This would be replaced with the actual treasure chest image */}
                <div className="w-3/4 h-3/4 bg-[#ffd700] border-4 border-[#1a1a2e] flex items-center justify-center">
                  <span className="text-6xl">?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {isOpening && (
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-[#ffd700] animate-ping" />
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-[#1a1a2e] border-4 border-[#ffd700] rounded-none flex items-center justify-center mb-4">
                  <span className="text-[#ffd700] font-pixel text-4xl">5</span>
                </div>
                <h2 className="text-2xl font-pixel text-[#1a1a2e] bg-white/70 p-2 border-4 border-[#1a1a2e]">
                  NEW CARDS!
                </h2>
                <p className="text-[#1a1a2e] font-pixel mb-4">Tap to reveal your new Corgis</p>
                <PixelButton
                  onClick={handleContinue}
                  className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-6 py-3 text-lg font-pixel"
                >
                  REVEAL CARDS
                </PixelButton>
              </motion.div>
            </div>
          )}
        </motion.div>

        {!isOpening && (
          <PixelButton
            onClick={handleOpenPack}
            className="mt-8 bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-6 py-3 text-lg font-pixel"
          >
            OPEN NOW!
          </PixelButton>
        )}
      </div>
    </div>
  )
}
