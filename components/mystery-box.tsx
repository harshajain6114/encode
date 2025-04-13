"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gift, Clock } from "lucide-react"
import { PixelButton } from "./pixel-button"
import { useUser } from "@/app/context/user-context"
import { useSound } from "@/hooks/use-sound"

// Power-up options
const POWER_UPS = [
  { type: "speed", label: "5X SPEED", value: 5, duration: 30 },
  { type: "jump", label: "5X JUMP", value: 5, duration: 30 },
  { type: "fluffiness", label: "5X FLUFFINESS", value: 5, duration: 30 },
  { type: "barkPower", label: "5X BARK POWER", value: 5, duration: 30 },
  { type: "napSkills", label: "5X NAP SKILLS", value: 5, duration: 30 },
] as const

export function MysteryBox() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [reward, setReward] = useState<(typeof POWER_UPS)[number] | null>(null)
  const { addPowerUp } = useUser()
  const { playSound } = useSound()

  // Check if mystery box is available
  useEffect(() => {
    const lastOpened = localStorage.getItem("mystery-box-last-opened")

    if (lastOpened) {
      const lastOpenedTime = Number.parseInt(lastOpened, 10)
      const currentTime = Date.now()
      const timeDiff = currentTime - lastOpenedTime
      const cooldownTime = 2 * 60 * 1000 // 2 minutes in milliseconds

      if (timeDiff < cooldownTime) {
        setIsAvailable(false)
        setTimeRemaining(Math.ceil((cooldownTime - timeDiff) / 1000))
      }
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!isAvailable && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }

    if (timeRemaining === 0 && !isAvailable) {
      setIsAvailable(true)
    }
  }, [timeRemaining, isAvailable])

  const handleOpenBox = () => {
    if (!isAvailable) return

    playSound("chest-open")
    setIsOpen(true)

    // Select random power-up
    const randomIndex = Math.floor(Math.random() * POWER_UPS.length)
    const selectedReward = POWER_UPS[randomIndex]
    setReward(selectedReward)

    // Add power-up to user
    addPowerUp(selectedReward.type, selectedReward.value, selectedReward.duration)

    // Set cooldown
    localStorage.setItem("mystery-box-last-opened", Date.now().toString())

    // Play success sound after a delay
    setTimeout(() => {
      playSound("success")
    }, 1000)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsOpen(false)
      setIsAvailable(false)
      setTimeRemaining(2 * 60) // 2 minutes
      setReward(null)
    }, 3000)
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="absolute bottom-4 right-4 z-40">
      {isOpen && reward ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#1a1a2e] border-4 border-[#ffd700] p-4 text-center"
        >
          <h3 className="text-xl font-pixel text-[#ffd700] mb-2">POWER-UP!</h3>
          <div className="text-2xl font-pixel text-white mb-2">{reward.label}</div>
          <p className="text-sm font-pixel text-[#ffd700]">ACTIVE FOR {reward.duration} MINUTES</p>
        </motion.div>
      ) : (
        <div className="relative">
          <PixelButton
            onClick={handleOpenBox}
            disabled={!isAvailable}
            className={`bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-4 py-2 font-pixel ${
              !isAvailable ? "opacity-50 cursor-not-allowed" : "animate-pulse-slow"
            }`}
          >
            <Gift className="h-5 w-5 mr-2" /> MYSTERY BOX
          </PixelButton>

          {!isAvailable && (
            <div className="absolute -top-8 right-0 bg-[#1a1a2e] text-[#ffd700] font-pixel text-xs px-2 py-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {formatTime(timeRemaining)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
