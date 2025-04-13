"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Home, Star } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { PixelBackground } from "@/components/pixel-background"
import { PixelButton } from "@/components/pixel-button"
import { SoundToggle } from "@/components/sound-toggle"
import { PixelCard } from "@/components/pixel-card"

const CARDS = [
  {
    id: 1,
    name: "FLAME ATTACK",
    rarity: "epic",
    image: "/images/flame-attack-card.png",
    attack: 3,
    defense: 2,
    special: 1,
  },
  {
    id: 2,
    name: "CORGI GUARD",
    rarity: "rare",
    image: "/images/corgi-guard-card.png",
    attack: 2,
    defense: 3,
    special: 2,
  },
  {
    id: 3,
    name: "ROYAL BARK",
    rarity: "common",
    image: "/placeholder.svg?height=300&width=200",
    attack: 1,
    defense: 2,
    special: 1,
  },
  {
    id: 4,
    name: "FLUFFY CHARGE",
    rarity: "uncommon",
    image: "/placeholder.svg?height=300&width=200",
    attack: 2,
    defense: 1,
    special: 1,
  },
  {
    id: 5,
    name: "GOLDEN PAW",
    rarity: "legendary",
    image: "/placeholder.svg?height=300&width=200",
    attack: 4,
    defense: 4,
    special: 3,
  },
  {
    id: 6,
    name: "TAIL WHIP",
    rarity: "rare",
    image: "/placeholder.svg?height=300&width=200",
    attack: 3,
    defense: 1,
    special: 2,
  },
  {
    id: 7,
    name: "PUPPY EYES",
    rarity: "common",
    image: "/placeholder.svg?height=300&width=200",
    attack: 0,
    defense: 2,
    special: 3,
  },
  {
    id: 8,
    name: "ROYAL GUARD",
    rarity: "epic",
    image: "/placeholder.svg?height=300&width=200",
    attack: 2,
    defense: 4,
    special: 1,
  },
  {
    id: 9,
    name: "QUICK DASH",
    rarity: "uncommon",
    image: "/placeholder.svg?height=300&width=200",
    attack: 3,
    defense: 1,
    special: 1,
  },
  {
    id: 10,
    name: "CROWN JEWEL",
    rarity: "legendary",
    image: "/placeholder.svg?height=300&width=200",
    attack: 5,
    defense: 3,
    special: 2,
  },
  {
    id: 11,
    name: "LOYAL FRIEND",
    rarity: "common",
    image: "/placeholder.svg?height=300&width=200",
    attack: 1,
    defense: 3,
    special: 1,
  },
  {
    id: 12,
    name: "HERDING MASTER",
    rarity: "rare",
    image: "/placeholder.svg?height=300&width=200",
    attack: 2,
    defense: 2,
    special: 3,
  },
  {
    id: 13,
    name: "CORGI JUMP",
    rarity: "uncommon",
    image: "/placeholder.svg?height=300&width=200",
    attack: 2,
    defense: 2,
    special: 2,
  },
  {
    id: 14,
    name: "ROYAL DECREE",
    rarity: "epic",
    image: "/placeholder.svg?height=300&width=200",
    attack: 3,
    defense: 3,
    special: 2,
  },
  {
    id: 15,
    name: "STUBBY LEGS",
    rarity: "rare",
    image: "/placeholder.svg?height=300&width=200",
    attack: 1,
    defense: 4,
    special: 1,
  },
  {
    id: 16,
    name: "HAPPY BARK",
    rarity: "common",
    image: "/placeholder.svg?height=300&width=200",
    attack: 2,
    defense: 1,
    special: 1,
  },
  {
    id: 17,
    name: "CORGI DASH",
    rarity: "uncommon",
    image: "/placeholder.svg?height=300&width=200",
    attack: 3,
    defense: 1,
    special: 1,
  },
  {
    id: 18,
    name: "ROYAL COMMAND",
    rarity: "epic",
    image: "/placeholder.svg?height=300&width=200",
    attack: 3,
    defense: 2,
    special: 3,
  },
  {
    id: 19,
    name: "FLUFFY DEFENSE",
    rarity: "rare",
    image: "/placeholder.svg?height=300&width=200",
    attack: 1,
    defense: 5,
    special: 1,
  },
  {
    id: 20,
    name: "ULTIMATE CORGI",
    rarity: "legendary",
    image: "/placeholder.svg?height=300&width=200",
    attack: 5,
    defense: 5,
    special: 5,
  },
]

export default function CardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const { playSound, stopSound } = useSound()

  // Play background music when page loads
  useEffect(() => {
    playSound("card-reveal-music", true)

    return () => {
      stopSound("card-reveal-music")
    }
  }, [playSound, stopSound])

  const handleFlipCard = useCallback(
    (id: number) => {
      if (!flippedCards.includes(id)) {
        playSound("card-flip")
        setFlippedCards((prev) => [...prev, id])

        // Show confetti for legendary cards
        const card = CARDS.find((c) => c.id === id)
        if (card && card.rarity === "legendary") {
          setShowConfetti(true)
          playSound("legendary-reveal")
          setTimeout(() => setShowConfetti(false), 3000)
        }
      }
    },
    [flippedCards, playSound],
  )

  const handleNext = useCallback(() => {
    if (currentIndex < CARDS.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      playSound("swipe")
    }
  }, [currentIndex, playSound])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      playSound("swipe")
    }
  }, [currentIndex, playSound])

  const handleAddToCollection = useCallback(() => {
    playSound("button-click")
    // Add your collection logic here
  }, [playSound])

  const currentCard = CARDS[currentIndex]
  const isFlipped = flippedCards.includes(currentCard.id)

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

      <div className="absolute top-4 right-4 z-50">
        <SoundToggle />
      </div>

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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-pixel text-[#1a1a2e] mb-6 tracking-wider">YOUR NEW CARDS</h1>
        <div className="mb-4 bg-[#1a1a2e] text-[#ffd700] font-pixel p-2 border-4 border-[#ffd700]">
          <p className="flex items-center justify-center gap-2">
            CARD {currentIndex + 1} OF {CARDS.length}
            {currentCard.rarity === "legendary" && <Star className="h-5 w-5 fill-current text-[#ffd700]" />}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center h-auto max-h-96">
          <PixelCard
            key={currentCard.id}
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={() => handleFlipCard(currentCard.id)}
          />

          {isFlipped && (
            <PixelButton
              onClick={handleAddToCollection}
              className="mt-4 bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900]"
            >
              ADD TO COLLECTION
            </PixelButton>
          )}

          <div className="flex gap-4 mt-6">
            <PixelButton onClick={handlePrev} disabled={currentIndex === 0}>
              <ChevronLeft className="h-5 w-5" />
            </PixelButton>
            <PixelButton onClick={handleNext} disabled={currentIndex === CARDS.length - 1}>
              <ChevronRight className="h-5 w-5" />
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  )
}
