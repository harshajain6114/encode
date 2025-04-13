"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface CardProps {
  id: number
  name: string
  rarity: string
  image: string
}

interface CorgiCardMiniProps {
  card: CardProps
  isSelected?: boolean
  onClick: () => void
}

const RARITY_COLORS = {
  common: "from-gray-400 to-gray-600",
  uncommon: "from-green-400 to-green-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-amber-400 to-amber-600",
}

export function CorgiCardMini({ card, isSelected = false, onClick }: CorgiCardMiniProps) {
  return (
    <motion.div
      className={`relative w-full aspect-[2/3] cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
        isSelected ? "ring-4 ring-yellow-400 shadow-glow scale-105" : "hover:scale-105"
      }`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${RARITY_COLORS[card.rarity]} p-0.5`}>
        <div className="w-full h-full bg-white rounded-sm flex flex-col overflow-hidden">
          {/* Card Image */}
          <div className="relative w-full h-3/5 bg-gray-100 overflow-hidden">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }}>
              {/* This would be replaced with the actual card image */}
            </div>

            {/* Rarity indicator */}
            <div
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{
                backgroundColor: {
                  common: "#9CA3AF",
                  uncommon: "#10B981",
                  rare: "#3B82F6",
                  epic: "#8B5CF6",
                  legendary: "#F59E0B",
                }[card.rarity],
              }}
            ></div>

            {card.rarity === "legendary" && (
              <Sparkles className="absolute top-0 left-0 w-full h-full text-yellow-300 opacity-30 animate-pulse-slow" />
            )}
          </div>

          {/* Card Name */}
          <div className="flex-1 p-1 flex items-center justify-center">
            <h3 className="font-bold text-gray-800 text-xs text-center line-clamp-2">{card.name}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
