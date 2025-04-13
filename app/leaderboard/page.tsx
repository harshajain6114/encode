"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Trophy, Medal, Award } from "lucide-react"
import { SoundToggle } from "@/components/sound-toggle"
import { PixelBackground } from "@/components/pixel-background"
import { PixelButton } from "@/components/pixel-button"
import { useSound } from "@/hooks/use-sound"

// Sample leaderboard data
const LEADERBOARD_DATA = [
  {
    id: 1,
    name: "CorgiMaster",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 9850,
    rank: 1,
    badges: ["collector", "trader", "mystery"],
  },
  {
    id: 2,
    name: "FluffyTail",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 8720,
    rank: 2,
    badges: ["collector", "trader"],
  },
  {
    id: 3,
    name: "BarkLord",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 7650,
    rank: 3,
    badges: ["mystery"],
  },
  {
    id: 4,
    name: "PawsomePlayer",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 6540,
    rank: 4,
    badges: ["collector"],
  },
  {
    id: 5,
    name: "CorgiQueen",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 5980,
    rank: 5,
    badges: ["trader"],
  },
  { id: 6, name: "WoofWizard", avatar: "/placeholder.svg?height=100&width=100", score: 5430, rank: 6, badges: [] },
  {
    id: 7,
    name: "FurryFriend",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 4870,
    rank: 7,
    badges: ["collector"],
  },
  { id: 8, name: "TailWagger", avatar: "/placeholder.svg?height=100&width=100", score: 4320, rank: 8, badges: [] },
  {
    id: 9,
    name: "CorgiLover",
    avatar: "/placeholder.svg?height=100&width=100",
    score: 3760,
    rank: 9,
    badges: ["mystery"],
  },
  { id: 10, name: "PuppyPro", avatar: "/placeholder.svg?height=100&width=100", score: 3210, rank: 10, badges: [] },
]

const BADGE_ICONS = {
  collector: <Trophy className="h-4 w-4 text-[#ffd700]" />,
  trader: <Medal className="h-4 w-4 text-[#3b82f6]" />,
  mystery: <Award className="h-4 w-4 text-[#8b5cf6]" />,
}

const BADGE_TITLES = {
  collector: "Master Collector",
  trader: "Trading Expert",
  mystery: "Mystery Solver",
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("global")
  const { playSound } = useSound()

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

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-8 min-h-screen px-4">
        <h1 className="text-4xl md:text-5xl font-pixel text-[#1a1a2e] mb-6 tracking-wider">LEADERBOARD</h1>

        <div className="w-full max-w-2xl">
          <div className="flex mb-4">
            <button
              onClick={() => {
                setActiveTab("global")
                playSound("button-click")
              }}
              className={`flex-1 py-2 font-pixel border-4 border-[#1a1a2e] ${
                activeTab === "global" ? "bg-[#ffd700] text-[#1a1a2e]" : "bg-[#1a1a2e] text-[#ffd700]"
              }`}
            >
              GLOBAL
            </button>
            <button
              onClick={() => {
                setActiveTab("friends")
                playSound("button-click")
              }}
              className={`flex-1 py-2 font-pixel border-4 border-l-0 border-[#1a1a2e] ${
                activeTab === "friends" ? "bg-[#ffd700] text-[#1a1a2e]" : "bg-[#1a1a2e] text-[#ffd700]"
              }`}
            >
              FRIENDS
            </button>
          </div>

          {activeTab === "global" ? (
            <div className="bg-white border-4 border-[#1a1a2e]">
              <div className="overflow-y-auto max-h-[70vh]">
                <table className="w-full border-collapse">
                  <thead className="bg-[#1a1a2e] text-[#ffd700] font-pixel">
                    <tr>
                      <th className="py-3 px-4 text-left border-b-4 border-[#ffd700]">RANK</th>
                      <th className="py-3 px-4 text-left border-b-4 border-[#ffd700]">PLAYER</th>
                      <th className="py-3 px-4 text-right border-b-4 border-[#ffd700]">SCORE</th>
                      <th className="py-3 px-4 text-right border-b-4 border-[#ffd700]">BADGES</th>
                    </tr>
                  </thead>
                  <tbody className="font-pixel">
                    {LEADERBOARD_DATA.map((player, index) => (
                      <motion.tr
                        key={player.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b-2 border-[#1a1a2e] ${index < 3 ? "bg-[#ffd700]/10" : ""}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {index === 0 && <Trophy className="h-5 w-5 text-[#ffd700] mr-1" />}
                            {index === 1 && <Trophy className="h-5 w-5 text-gray-300 mr-1" />}
                            {index === 2 && <Trophy className="h-5 w-5 text-[#cd7f32] mr-1" />}
                            <span>{player.rank}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 mr-2 bg-[#1a1a2e] flex items-center justify-center text-[#ffd700]">
                              {player.name.substring(0, 2)}
                            </div>
                            <span>{player.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-bold">{player.score.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-1">
                            {player.badges.map((badge) => (
                              <div
                                key={badge}
                                className="w-6 h-6 bg-[#1a1a2e] flex items-center justify-center"
                                title={BADGE_TITLES[badge]}
                              >
                                {BADGE_ICONS[badge]}
                              </div>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-[#1a1a2e] p-8 text-center">
              <p className="font-pixel text-[#1a1a2e] mb-4">Connect with friends to see their rankings!</p>
              <PixelButton
                className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] font-pixel"
                onClick={() => playSound("button-click")}
              >
                FIND FRIENDS
              </PixelButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
