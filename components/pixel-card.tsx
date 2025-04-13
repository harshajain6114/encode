"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface CardProps {
  id: number
  name: string
  rarity: string
  image: string
  attack: number
  defense: number
  special: number
}

interface PixelCardProps {
  card: CardProps
  isFlipped: boolean
  onFlip: () => void
}

const RARITY_COLORS = {
  common: { bg: "#6b7280", border: "#4b5563" },
  uncommon: { bg: "#10b981", border: "#059669" },
  rare: { bg: "#3b82f6", border: "#2563eb" },
  epic: { bg: "#8b5cf6", border: "#7c3aed" },
  legendary: { bg: "#f59e0b", border: "#d97706" },
}

export function PixelCard({ card, isFlipped, onFlip }: PixelCardProps) {
  const colors = RARITY_COLORS[card.rarity]

  return (
    <div className="relative w-full aspect-[2/3] cursor-pointer" onClick={onFlip}>
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full rounded-none overflow-hidden border-8"
          style={{
            backfaceVisibility: "hidden",
            borderColor: "#1a1a2e",
          }}
        >
          <div className="w-full h-full bg-[#ffd700] p-1">
            <div className="w-full h-full border-4 border-[#1a1a2e] flex items-center justify-center bg-[#1a1a2e]">
              <div className="text-6xl font-pixel text-[#ffd700]">?</div>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div
          className="absolute w-full h-full rounded-none overflow-hidden border-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: colors.border,
          }}
        >
          <div className="w-full h-full bg-white">
            {/* Card Header */}
            <div className="h-1/6 bg-[#1a1a2e] flex items-center justify-center">
              <h3 className="font-pixel text-[#ffd700] text-lg tracking-wider">{card.name}</h3>
            </div>

            {/* Card Image */}
            <div className="relative h-3/6 bg-white overflow-hidden border-y-4 border-[#1a1a2e]">
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundColor: colors.bg }}
              >
                {/* This would be replaced with the actual card image */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐶</span>
                </div>
              </div>

              {/* Rarity indicator */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-[#1a1a2e] text-xs font-pixel text-white">
                {card.rarity.toUpperCase()}
              </div>

              {card.rarity === "legendary" && (
                <Sparkles className="absolute top-0 left-0 w-full h-full text-[#ffd700] opacity-30 animate-pulse-slow" />
              )}
            </div>

            {/* Card Stats */}
            <div className="h-2/6 bg-white p-2 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="bg-red-500 p-1 text-center">
                  <span className="font-pixel text-white text-xs">ATK</span>
                  <div className="bg-white mt-1 font-pixel text-[#1a1a2e]">{card.attack}</div>
                </div>
                <div className="bg-blue-500 p-1 text-center">
                  <span className="font-pixel text-white text-xs">DEF</span>
                  <div className="bg-white mt-1 font-pixel text-[#1a1a2e]">{card.defense}</div>
                </div>
                <div className="bg-purple-500 p-1 text-center">
                  <span className="font-pixel text-white text-xs">SPL</span>
                  <div className="bg-white mt-1 font-pixel text-[#1a1a2e]">{card.special}</div>
                </div>
              </div>

              <div className="bg-[#1a1a2e] p-1 text-center">
                <span className="font-pixel text-[#ffd700] text-xs tracking-wider">CORGI POWER</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
