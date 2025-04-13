"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface CardProps {
  id: number
  name: string
  rarity: string
  image: string
}

interface CorgiCardProps {
  card: CardProps
  isFlipped: boolean
  onFlip: () => void
}

const RARITY_COLORS = {
  common: "from-gray-400 to-gray-600",
  uncommon: "from-green-400 to-green-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-amber-400 to-amber-600",
}

const RARITY_GLOW = {
  common: "",
  uncommon: "shadow-green-glow",
  rare: "shadow-blue-glow",
  epic: "shadow-purple-glow",
  legendary: "shadow-amber-glow animate-pulse-slow",
}

export function CorgiCard({ card, isFlipped, onFlip }: CorgiCardProps) {
  return (
    <div className="relative w-full aspect-[2/3] cursor-pointer perspective-1000" onClick={onFlip}>
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-neon">
          <div className="w-full h-full bg-gradient-to-b from-purple-500 to-indigo-700 p-1">
            <div className="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center bg-[url('/placeholder.svg?height=400&width=300')] bg-cover bg-center">
              <div className="text-6xl">🎮</div>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden ${RARITY_GLOW[card.rarity]} rotate-y-180`}
        >
          <div className={`w-full h-full bg-gradient-to-b ${RARITY_COLORS[card.rarity]} p-1`}>
            <div className="w-full h-full bg-white rounded-lg flex flex-col overflow-hidden">
              {/* Card Image */}
              <div className="relative w-full h-3/5 bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }}>
                  {/* This would be replaced with the actual card image */}
                </div>

                {/* Rarity indicator */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-sm">
                  {card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}
                </div>

                {card.rarity === "legendary" && (
                  <Sparkles className="absolute top-0 left-0 w-full h-full text-yellow-300 opacity-30 animate-pulse-slow" />
                )}
              </div>

              {/* Card Info */}
              <div className="flex-1 p-3 flex flex-col justify-between">
                <h3 className="font-bold text-gray-800 text-center">{card.name}</h3>

                <div className="mt-2 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 }[card.rarity]
                          ? "bg-yellow-400"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
