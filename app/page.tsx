"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, HelpCircle, Trophy, User, CoinsIcon as Coin } from "lucide-react"
import { SoundToggle } from "@/components/sound-toggle"
import { useSound } from "@/hooks/use-sound"
import { PixelBackground } from "@/components/pixel-background"
import { HowToPlayModal } from "@/components/how-to-play-modal"
import { CorgiFactToast } from "@/components/corgi-fact-toast"
import { PixelButton } from "@/components/pixel-button"
import { MysteryBox } from "@/components/mystery-box"
import { NameInputModal } from "@/components/name-input-modal"
import { useUser } from "./context/user-context"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false)
  const [showFact, setShowFact] = useState(false)
  const [showNameInput, setShowNameInput] = useState(true)
  const { playSound } = useSound()
  const { userData, canPlay } = useUser()
  const router = useRouter()

  // Show random Corgi facts periodically
  useEffect(() => {
    const factInterval = setInterval(() => {
      setShowFact(true)
      setTimeout(() => setShowFact(false), 5000)
    }, 20000)

    return () => clearInterval(factInterval)
  }, [])

  const handleHowToPlay = useCallback(() => {
    playSound("button-click")
    setIsHowToPlayOpen(true)
  }, [playSound])

  const handlePlayGame = useCallback(() => {
    playSound("button-click")

    if (!canPlay) {
      alert("You've reached your daily play limit! Come back tomorrow for more Corgi adventures!")
      return
    }

    router.push("/random-number")
  }, [playSound, router, canPlay])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f0f0f8]">
      {/* Pixel art background */}
      <PixelBackground />

      {/* Name input modal */}
      {showNameInput && <NameInputModal onComplete={() => setShowNameInput(false)} />}

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-[#1a1a2e]/80 backdrop-blur-sm border-b-4 border-[#ffd700]">
        {/* Navigation Left */}
        <div className="flex gap-2">
          <Link href="/leaderboard">
            <PixelButton
              onClick={() => playSound("button-click")}
              className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900]"
            >
              <Trophy className="h-5 w-5 mr-1" /> Leaderboard
            </PixelButton>
          </Link>
          <Link href="/profile">
            <PixelButton
              onClick={() => playSound("button-click")}
              className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900]"
            >
              <User className="h-5 w-5 mr-1" /> My Profile
            </PixelButton>
          </Link>
        </div>

        {/* User Name Display */}
        {userData.name && (
          <div className="bg-[#1a1a2e] px-3 py-1 border-2 border-[#ffd700]">
            <span className="font-pixel text-[#ffd700]">{userData.name}</span>
          </div>
        )}

        {/* Navigation Right */}
        <div className="flex gap-2">
          <PixelButton
            onClick={handleHowToPlay}
            className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900]"
          >
            <HelpCircle className="h-5 w-5" />
          </PixelButton>
          <SoundToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Game Logo */}
        <div className="w-full max-w-5xl mb-8">
          <Image
            src="/images/corgi-game-title.png"
            alt="CORGI THE GAME"
            width={1200}
            height={600}
            className="w-full h-auto pixelated"
            priority
          />
        </div>

        {/* Token Display */}
        <div className="absolute top-20 right-4 z-40 flex items-center bg-[#1a1a2e] px-4 py-2 rounded-lg border-2 border-[#ffd700]">
          <Coin className="h-6 w-6 text-[#ffd700] mr-2" />
          <span className="text-white font-pixel text-xl">{userData.corgiTokens} CORGI</span>
        </div>

        {/* Daily Plays Display */}
        <div className="absolute top-20 left-4 z-40 bg-[#1a1a2e] px-4 py-2 rounded-lg border-2 border-[#ffd700]">
          <span className="text-white font-pixel text-sm">DAILY PLAYS: {userData.dailyPlays}/5</span>
        </div>

        {/* Mystery Box */}
        <MysteryBox />

        {/* Play Game Section */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 text-center">
          <PixelButton
            size="lg"
            onClick={handlePlayGame}
            className={`bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-8 border-[#cc9900] px-12 py-6 text-2xl font-pixel ${
              canPlay ? "animate-pulse-slow" : "opacity-70"
            }`}
          >
            <Play className="h-8 w-8 mr-2" /> PLAY GAME
          </PixelButton>

          {!canPlay && (
            <p className="mt-2 text-[#1a1a2e] font-pixel bg-white/70 p-2">Daily limit reached! Come back tomorrow!</p>
          )}
        </div>
      </div>

      {/* Modal and Toast */}
      <HowToPlayModal isOpen={isHowToPlayOpen} onClose={() => setIsHowToPlayOpen(false)} />
      {showFact && <CorgiFactToast />}
    </div>
  )
}
