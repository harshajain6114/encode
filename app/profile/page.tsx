"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Home, Settings, Trophy, Medal, Award, Repeat } from "lucide-react"
import { SoundToggle } from "@/components/sound-toggle"
import { PixelBackground } from "@/components/pixel-background"
import { PixelButton } from "@/components/pixel-button"
import { useSound } from "@/hooks/use-sound"

// Sample user data
const USER = {
  name: "CorgiMaster",
  avatar: "/placeholder.svg?height=200&width=200",
  level: 42,
  xp: 8750,
  nextLevel: 10000,
  badges: ["collector", "trader", "mystery"],
}

// Sample collection data
const COLLECTION = [
  { id: 1, name: "FLAME ATTACK", rarity: "epic", image: "/images/flame-attack-card.png" },
  { id: 2, name: "CORGI GUARD", rarity: "rare", image: "/images/corgi-guard-card.png" },
  { id: 3, name: "ROYAL BARK", rarity: "common", image: "/placeholder.svg?height=300&width=200" },
  { id: 4, name: "FLUFFY CHARGE", rarity: "uncommon", image: "/placeholder.svg?height=300&width=200" },
  { id: 5, name: "GOLDEN PAW", rarity: "legendary", image: "/placeholder.svg?height=300&width=200" },
  { id: 6, name: "TAIL WHIP", rarity: "rare", image: "/placeholder.svg?height=300&width=200" },
  { id: 7, name: "PUPPY EYES", rarity: "common", image: "/placeholder.svg?height=300&width=200" },
  { id: 8, name: "ROYAL GUARD", rarity: "epic", image: "/placeholder.svg?height=300&width=200" },
]

const BADGE_ICONS = {
  collector: <Trophy className="h-5 w-5 text-[#ffd700]" />,
  trader: <Medal className="h-5 w-5 text-[#3b82f6]" />,
  mystery: <Award className="h-5 w-5 text-[#8b5cf6]" />,
}

const BADGE_TITLES = {
  collector: "Master Collector",
  trader: "Trading Expert",
  mystery: "Mystery Solver",
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("collection")
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const { playSound } = useSound()

  const handleCardClick = (id: number) => {
    setSelectedCard(id === selectedCard ? null : id)
    playSound("card-select")
  }

  const handleTradeClick = () => {
    if (selectedCard) {
      playSound("success")
      // Trade logic would go here
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f0f0f8]">
      {/* Pixel art background */}
      <PixelBackground />

      {/* Sound toggle */}
      <div className="absolute top-4 right-4 z-50">
        <SoundToggle />
      </div>

      {/* Home button */}
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

      {/* Settings button */}
      <div className="absolute top-4 left-16 z-50">
        <PixelButton
          onClick={() => playSound("button-click")}
          className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] w-10 h-10 p-0 flex items-center justify-center"
        >
          <Settings className="h-5 w-5" />
        </PixelButton>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-8 min-h-screen px-4">
        <div className="w-full max-w-2xl">
          {/* User profile header */}
          <div className="bg-white border-4 border-[#1a1a2e] p-6 mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 mr-4 bg-[#1a1a2e] border-4 border-[#ffd700] flex items-center justify-center text-[#ffd700] font-pixel text-2xl">
                {USER.name.substring(0, 2)}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-pixel text-[#1a1a2e]">{USER.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="font-pixel text-[#1a1a2e] mr-2">LVL {USER.level}</span>
                  <div className="flex-1 h-4 bg-[#1a1a2e] overflow-hidden">
                    <div
                      className="h-full bg-[#ffd700]"
                      style={{ width: `${(USER.xp / USER.nextLevel) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-pixel text-[#1a1a2e] ml-2 text-sm">
                    {USER.xp}/{USER.nextLevel} XP
                  </span>
                </div>
              </div>
            </div>

            <div className="flex mt-4 gap-2">
              {USER.badges.map((badge) => (
                <div key={badge} className="flex items-center bg-[#1a1a2e] px-3 py-1" title={BADGE_TITLES[badge]}>
                  {BADGE_ICONS[badge]}
                  <span className="ml-1 text-white font-pixel text-sm">{BADGE_TITLES[badge]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab("collection")
                  playSound("button-click")
                }}
                className={`flex-1 py-2 font-pixel border-4 border-[#1a1a2e] ${
                  activeTab === "collection" ? "bg-[#ffd700] text-[#1a1a2e]" : "bg-[#1a1a2e] text-[#ffd700]"
                }`}
              >
                COLLECTION
              </button>
              <button
                onClick={() => {
                  setActiveTab("trading")
                  playSound("button-click")
                }}
                className={`flex-1 py-2 font-pixel border-4 border-l-0 border-[#1a1a2e] ${
                  activeTab === "trading" ? "bg-[#ffd700] text-[#1a1a2e]" : "bg-[#1a1a2e] text-[#ffd700]"
                }`}
              >
                TRADING
              </button>
            </div>
          </div>

          {activeTab === "collection" ? (
            <div className="bg-white border-4 border-[#1a1a2e] p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {COLLECTION.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`cursor-pointer ${card.id === selectedCard ? "ring-4 ring-[#ffd700]" : ""}`}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {card.id <= 2 ? (
                      // Use actual card images for the first two cards
                      <Image
                        src={card.image || "/placeholder.svg"}
                        alt={card.name}
                        width={150}
                        height={225}
                        className="w-full h-auto pixelated"
                      />
                    ) : (
                      // Use a placeholder for the rest
                      <div className="aspect-[2/3] bg-[#1a1a2e] border-4 border-[#ffd700] flex flex-col">
                        <div className="h-1/6 bg-[#ffd700] flex items-center justify-center">
                          <span className="font-pixel text-[#1a1a2e] text-xs">{card.name}</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-2xl">🐶</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-[#1a1a2e] p-6">
              {selectedCard ? (
                <div className="text-center">
                  <h3 className="text-xl font-pixel text-[#1a1a2e] mb-4">
                    READY TO TRADE {COLLECTION.find((c) => c.id === selectedCard)?.name}?
                  </h3>
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-48 relative">
                      {selectedCard <= 2 ? (
                        // Use actual card images for the first two cards
                        <Image
                          src={COLLECTION.find((c) => c.id === selectedCard)?.image || ""}
                          alt={COLLECTION.find((c) => c.id === selectedCard)?.name || ""}
                          width={150}
                          height={225}
                          className="w-full h-auto pixelated"
                        />
                      ) : (
                        // Use a placeholder for the rest
                        <div className="w-full h-full bg-[#1a1a2e] border-4 border-[#ffd700] flex flex-col">
                          <div className="h-1/6 bg-[#ffd700] flex items-center justify-center">
                            <span className="font-pixel text-[#1a1a2e] text-xs">
                              {COLLECTION.find((c) => c.id === selectedCard)?.name}
                            </span>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <span className="text-2xl">🐶</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <PixelButton
                    onClick={handleTradeClick}
                    className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] font-pixel"
                  >
                    <Repeat className="mr-2 h-4 w-4" /> FIND TRADE PARTNERS
                  </PixelButton>
                </div>
              ) : (
                <div className="text-center font-pixel text-[#1a1a2e] p-4">
                  <p>SELECT A CARD FROM YOUR COLLECTION TO TRADE!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
