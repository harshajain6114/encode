"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, RefreshCw, Zap, Wind, ArrowUp, Sparkles, Volume2, Coffee } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { CountdownTimer } from "@/components/countdown-timer"
import { PixelBackground } from "@/components/pixel-background"
import { PixelButton } from "@/components/pixel-button"
import { SoundToggle } from "@/components/sound-toggle"
import { useUser } from "@/app/context/user-context"
import Link from "next/link"
import { CoinsIcon as Coin } from "lucide-react"

// Random number generator
function generateRandomNumber(length = 10) {
  const randomValues = new Uint8Array(length)
  window.crypto.getRandomValues(randomValues)

  const characters = "0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    const index = randomValues[i] % characters.length
    result += characters[index]
  }

  return result
}

// Trait icons
const TRAIT_ICONS = {
  speed: <Wind className="h-5 w-5 text-[#ffd700]" />,
  jump: <ArrowUp className="h-5 w-5 text-[#ffd700]" />,
  fluffiness: <Sparkles className="h-5 w-5 text-[#ffd700]" />,
  barkPower: <Volume2 className="h-5 w-5 text-[#ffd700]" />,
  napSkills: <Coffee className="h-5 w-5 text-[#ffd700]" />,
}

// Corgi power levels
const CORGI_LEVELS = [
  { min: 0, max: 30, name: "Sleepy Corgi", emoji: "😴" },
  { min: 31, max: 60, name: "Happy Corgi", emoji: "🐶" },
  { min: 61, max: 90, name: "Mega Corgi", emoji: "💪🐶" },
  { min: 91, max: Number.POSITIVE_INFINITY, name: "Legendary Corgi", emoji: "✨🐶👑" },
]

export default function RandomNumberPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [randomNumber, setRandomNumber] = useState<string>("")
  const [isCountdownRunning, setIsCountdownRunning] = useState(true)
  const [showGenerateButton, setShowGenerateButton] = useState(false)
  const [showCorgiStats, setShowCorgiStats] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { playSound, stopSound } = useSound()
  const { userData, incrementDailyPlays, updatePowerLevel, addCorgiTokens, hasPowerUp, getPowerUpValue } = useUser()

  // Check if user can play
  useEffect(() => {
    if (!userData.name) {
      router.push("/")
    }
  }, [userData.name, router])

  // Sound control
  useEffect(() => {
    if (isCountdownRunning) {
      playSound("countdown-loop", true)
    }
    return () => stopSound("countdown-loop")
  }, [isCountdownRunning, playSound, stopSound])

  const handleGenerate = useCallback(() => {
    // Check if user can play today
    if (!incrementDailyPlays()) {
      alert("You've reached your daily play limit! Come back tomorrow for more Corgi adventures!")
      router.push("/")
      return
    }

    setIsCountdownRunning(false)
    setIsGenerating(true)
    playSound("chest-open")

    setTimeout(() => {
      const number = generateRandomNumber(10)
      setRandomNumber(number)
      setIsRevealed(true)
      playSound("success")
    }, 2000)
  }, [playSound, incrementDailyPlays, router])

  const handleRevealCorgiStats = useCallback(() => {
    playSound("card-flip")
    setShowCorgiStats(true)

    // Calculate power level with power-ups applied
    const baseTraits = {
      speed: randomNumber ? Number.parseInt(randomNumber[0]) : 0,
      jump: randomNumber ? Number.parseInt(randomNumber[1]) : 0,
      fluffiness: randomNumber ? Number.parseInt(randomNumber[2]) : 0,
      barkPower: randomNumber ? Number.parseInt(randomNumber[3]) : 0,
      napSkills: randomNumber ? Number.parseInt(randomNumber[4]) : 0,
    }

    // Calculate total power level
    const powerLevel = randomNumber.split("").reduce((sum, digit) => sum + Number.parseInt(digit), 0)

    // Update user's power level
    updatePowerLevel(powerLevel)

    // Award tokens based on power level
    const tokensEarned = Math.floor(powerLevel / 10) * 10
    addCorgiTokens(tokensEarned)

    // Show confetti for high power levels
    if (powerLevel > 60) {
      setShowConfetti(true)
      playSound("legendary-reveal")
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [randomNumber, playSound, updatePowerLevel, addCorgiTokens])

  const handlePlayAgain = useCallback(() => {
    playSound("button-click")
    setIsRevealed(false)
    setShowCorgiStats(false)
    setIsGenerating(false)
    setIsCountdownRunning(true)
    setShowGenerateButton(false)
  }, [playSound])

  // Calculate traits and power level with power-ups applied
  const baseTraits = {
    speed: randomNumber ? Number.parseInt(randomNumber[0]) : 0,
    jump: randomNumber ? Number.parseInt(randomNumber[1]) : 0,
    fluffiness: randomNumber ? Number.parseInt(randomNumber[2]) : 0,
    barkPower: randomNumber ? Number.parseInt(randomNumber[3]) : 0,
    napSkills: randomNumber ? Number.parseInt(randomNumber[4]) : 0,
  }

  // Apply power-ups to traits
  const traits = {
    speed: baseTraits.speed + (hasPowerUp("speed") ? getPowerUpValue("speed") : 0),
    jump: baseTraits.jump + (hasPowerUp("jump") ? getPowerUpValue("jump") : 0),
    fluffiness: baseTraits.fluffiness + (hasPowerUp("fluffiness") ? getPowerUpValue("fluffiness") : 0),
    barkPower: baseTraits.barkPower + (hasPowerUp("barkPower") ? getPowerUpValue("barkPower") : 0),
    napSkills: baseTraits.napSkills + (hasPowerUp("napSkills") ? getPowerUpValue("napSkills") : 0),
  }

  // Calculate power level
  const basePowerLevel = randomNumber
    ? randomNumber.split("").reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    : 0
  const powerUpBonus = Object.values(traits).reduce(
    (sum, value, index) => sum + (value - Object.values(baseTraits)[index]),
    0,
  )
  const powerLevel = basePowerLevel + powerUpBonus

  // Determine corgi level
  const corgiLevel = CORGI_LEVELS.find((level) => powerLevel >= level.min && powerLevel <= level.max) || CORGI_LEVELS[0]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f0f0f8]">
      <PixelBackground />

      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4"
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
      )}

      {/* Sound Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <SoundToggle />
      </div>

      {/* Back Button */}
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

      {/* User Name Display */}
      <div className="absolute top-4 left-16 z-50">
        <div className="bg-[#1a1a2e] px-3 py-1 border-2 border-[#ffd700]">
          <span className="font-pixel text-[#ffd700]">{userData.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Title shifted up */}
        <h1 className="text-4xl md:text-5xl font-pixel text-[#1a1a2e] mb-2 tracking-wider mt-[-2rem]">
          {showCorgiStats ? "CORGI POWER REVEAL" : "RANDOM NUMBER"}
        </h1>

        {!isGenerating && !isRevealed && (
          <div className="mb-8">
            <CountdownTimer
              seconds={5}
              onComplete={() => {
                playSound("timer-tick")
                setShowGenerateButton(true)
              }}
              onTick={() => playSound("timer-tick")}
            />
            <p className="text-[#1a1a2e] font-pixel mt-2 bg-white/70 p-2 border-4 border-[#1a1a2e]">
              GENERATING YOUR RANDOM NUMBER...
            </p>
          </div>
        )}

        <motion.div
          className="relative w-full max-w-md"
          initial={{ scale: 1 }}
          animate={{
            scale: isGenerating && !isRevealed ? [1, 1.1, 0.9, 1.05, 1] : 1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {!isRevealed ? (
            <div className="relative w-full h-64 flex items-center justify-center">
              <div
                className={`relative w-full h-full bg-[#1a1a2e] border-8 border-[#ffd700] flex items-center justify-center ${
                  isGenerating ? "animate-shake" : "animate-pulse-slow"
                }`}
              >
                <div className="w-3/4 h-3/4 bg-[#ffd700] border-4 border-[#1a1a2e] flex items-center justify-center">
                  <span className="text-6xl font-pixel">?</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              {!showCorgiStats ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full"
                >
                  <div className="w-full bg-[#1a1a2e] border-4 border-[#ffd700] p-4 mb-4">
                    <div className="flex justify-center flex-wrap">
                      {randomNumber.split("").map((digit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, rotateY: 180 }}
                          animate={{ opacity: 1, y: 0, rotateY: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                          className="w-10 h-12 m-1 bg-[#ffd700] border-2 border-[#1a1a2e] flex items-center justify-center"
                        >
                          <span className="text-3xl font-pixel text-[#1a1a2e]">{digit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-2xl font-pixel text-[#1a1a2e] bg-white/70 p-2 border-4 border-[#1a1a2e] mb-4">
                    YOUR RANDOM NUMBER
                  </h2>
                  <p className="text-[#1a1a2e] font-pixel mb-4">Generated using cryptographic randomness</p>

                  <PixelButton
                    onClick={handleRevealCorgiStats}
                    className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-6 py-3 text-lg font-pixel"
                  >
                    <Zap className="h-5 w-5 mr-2" /> REVEAL MY CORGI STATS
                  </PixelButton>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full"
                >
                  {/* Number display at the top */}
                  <div className="w-full bg-[#1a1a2e] border-4 border-[#ffd700] p-4 mb-4">
                    <div className="flex justify-center flex-wrap">
                      {randomNumber.split("").map((digit, index) => (
                        <div
                          key={index}
                          className="w-8 h-10 m-1 bg-[#ffd700] border-2 border-[#1a1a2e] flex items-center justify-center"
                        >
                          <span className="text-2xl font-pixel text-[#1a1a2e]">{digit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Traits */}
                  <div className="bg-white border-4 border-[#1a1a2e] p-4 mb-4">
                    <h3 className="text-xl font-pixel text-[#1a1a2e] mb-4 bg-[#ffd700] p-2">CORGI TRAITS</h3>

                    <div className="space-y-3">
                      {/* Speed */}
                      <div className="bg-[#1a1a2e] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {TRAIT_ICONS.speed}
                            <span className="font-pixel text-white ml-2">SPEED</span>
                          </div>
                          <span className="font-pixel text-[#ffd700]">
                            {traits.speed}/9
                            {hasPowerUp("speed") && (
                              <span className="text-green-400 ml-1">+{getPowerUpValue("speed")}</span>
                            )}
                          </span>
                        </div>
                        <div className="h-4 bg-white">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((traits.speed / 9) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="h-full bg-[#ffd700]"
                          />
                        </div>
                      </div>

                      {/* Jump */}
                      <div className="bg-[#1a1a2e] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {TRAIT_ICONS.jump}
                            <span className="font-pixel text-white ml-2">JUMP</span>
                          </div>
                          <span className="font-pixel text-[#ffd700]">
                            {traits.jump}/9
                            {hasPowerUp("jump") && (
                              <span className="text-green-400 ml-1">+{getPowerUpValue("jump")}</span>
                            )}
                          </span>
                        </div>
                        <div className="h-4 bg-white">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((traits.jump / 9) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-[#ffd700]"
                          />
                        </div>
                      </div>

                      {/* Fluffiness */}
                      <div className="bg-[#1a1a2e] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {TRAIT_ICONS.fluffiness}
                            <span className="font-pixel text-white ml-2">FLUFFINESS</span>
                          </div>
                          <span className="font-pixel text-[#ffd700]">
                            {traits.fluffiness}/9
                            {hasPowerUp("fluffiness") && (
                              <span className="text-green-400 ml-1">+{getPowerUpValue("fluffiness")}</span>
                            )}
                          </span>
                        </div>
                        <div className="h-4 bg-white">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((traits.fluffiness / 9) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-full bg-[#ffd700]"
                          />
                        </div>
                      </div>

                      {/* Bark Power */}
                      <div className="bg-[#1a1a2e] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {TRAIT_ICONS.barkPower}
                            <span className="font-pixel text-white ml-2">BARK POWER</span>
                          </div>
                          <span className="font-pixel text-[#ffd700]">
                            {traits.barkPower}/9
                            {hasPowerUp("barkPower") && (
                              <span className="text-green-400 ml-1">+{getPowerUpValue("barkPower")}</span>
                            )}
                          </span>
                        </div>
                        <div className="h-4 bg-white">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((traits.barkPower / 9) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-full bg-[#ffd700]"
                          />
                        </div>
                      </div>

                      {/* Nap Skills */}
                      <div className="bg-[#1a1a2e] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            {TRAIT_ICONS.napSkills}
                            <span className="font-pixel text-white ml-2">NAP SKILLS</span>
                          </div>
                          <span className="font-pixel text-[#ffd700]">
                            {traits.napSkills}/9
                            {hasPowerUp("napSkills") && (
                              <span className="text-green-400 ml-1">+{getPowerUpValue("napSkills")}</span>
                            )}
                          </span>
                        </div>
                        <div className="h-4 bg-white">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((traits.napSkills / 9) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-full bg-[#ffd700]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Power Level */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-[#1a1a2e] border-4 border-[#ffd700] p-4 mb-4"
                  >
                    <h3 className="text-xl font-pixel text-[#ffd700] mb-2">CORGI POWER LEVEL</h3>
                    <div className="text-5xl font-pixel text-white mb-2">
                      {powerLevel}
                      {powerUpBonus > 0 && <span className="text-green-400 text-2xl ml-2">+{powerUpBonus}</span>}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">{corgiLevel.emoji}</span>
                      <span className="font-pixel text-[#ffd700]">{corgiLevel.name}</span>
                    </div>
                  </motion.div>

                  {/* Tokens Earned */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="bg-white border-4 border-[#1a1a2e] p-4 mb-4"
                  >
                    <h3 className="text-xl font-pixel text-[#1a1a2e] mb-2">TOKENS EARNED</h3>
                    <div className="flex items-center justify-center">
                      <Coin className="h-6 w-6 text-[#ffd700] mr-2" />
                      <span className="text-3xl font-pixel text-[#1a1a2e]">+{Math.floor(powerLevel / 10) * 10}</span>
                    </div>
                  </motion.div>

                  <PixelButton
                    onClick={handlePlayAgain}
                    className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-6 py-3 text-lg font-pixel"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" /> PLAY AGAIN
                  </PixelButton>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Show generate button only after countdown */}
        {!isGenerating && !isRevealed && showGenerateButton && (
          <PixelButton
            onClick={handleGenerate}
            className="mt-8 bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-6 py-3 text-lg font-pixel"
          >
            GENERATE NOW!
          </PixelButton>
        )}
      </div>
    </div>
  )
}
