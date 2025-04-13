"use client"

import { X } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { PixelButton } from "@/components/pixel-button"

interface HowToPlayModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  const { playSound } = useSound()

  if (!isOpen) return null

  const handleClose = () => {
    playSound("button-click")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-[#f0f0f8] border-8 border-[#1a1a2e] p-6">
        <PixelButton
          onClick={handleClose}
          className="absolute top-2 right-2 bg-[#ff6b6b] text-white hover:bg-[#ff4f4f] border-b-4 border-[#cc5555] w-10 h-10 p-0 flex items-center justify-center"
        >
          <X className="h-5 w-5" />
        </PixelButton>

        <h2 className="text-3xl font-pixel text-[#1a1a2e] text-center mb-6 border-b-4 border-[#ffd700] pb-2">
          HOW TO PLAY
        </h2>

        <div className="space-y-6 text-[#1a1a2e] font-pixel">
          <div className="bg-white p-4 border-4 border-[#1a1a2e]">
            <h3 className="text-xl font-bold text-[#ffd700] bg-[#1a1a2e] p-2 mb-2">GETTING STARTED</h3>
            <p>
              Connect your wallet to start playing CorgiVerse. Once connected, you'll be able to collect, trade, and
              battle with your Corgi cards.
            </p>
          </div>

          <div className="bg-white p-4 border-4 border-[#1a1a2e]">
            <h3 className="text-xl font-bold text-[#ffd700] bg-[#1a1a2e] p-2 mb-2">MYSTERY PACKS</h3>
            <p>
              Open mystery packs to discover new Corgi cards. Each pack contains 5 random cards with different rarities:
              Common, Uncommon, Rare, Epic, and Legendary.
            </p>
          </div>

          <div className="bg-white p-4 border-4 border-[#1a1a2e]">
            <h3 className="text-xl font-bold text-[#ffd700] bg-[#1a1a2e] p-2 mb-2">CARD COLLECTION</h3>
            <p>
              Build your collection of Corgi cards. Each card has unique abilities and stats. View your collection in
              the Profile section.
            </p>
          </div>

          <div className="bg-white p-4 border-4 border-[#1a1a2e]">
            <h3 className="text-xl font-bold text-[#ffd700] bg-[#1a1a2e] p-2 mb-2">TRADING</h3>
            <p>
              Trade cards with other players to complete your collection. Select a card from your collection and find
              trading partners.
            </p>
          </div>

          <div className="bg-white p-4 border-4 border-[#1a1a2e]">
            <h3 className="text-xl font-bold text-[#ffd700] bg-[#1a1a2e] p-2 mb-2">LEADERBOARD</h3>
            <p>Compete with other players and climb the global leaderboard. Earn badges for your achievements.</p>
          </div>

          <div className="bg-white p-4 border-4 border-[#1a1a2e]">
            <h3 className="text-xl font-bold text-[#ffd700] bg-[#1a1a2e] p-2 mb-2">CARD RARITIES</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-gray-400 mr-2"></span>
                <span className="font-bold">COMMON</span> - Basic cards with standard abilities
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-green-400 mr-2"></span>
                <span className="font-bold">UNCOMMON</span> - Slightly enhanced cards
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-blue-400 mr-2"></span>
                <span className="font-bold">RARE</span> - Powerful cards with special abilities
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-purple-400 mr-2"></span>
                <span className="font-bold">EPIC</span> - Very powerful cards with unique traits
              </li>
              <li className="flex items-center">
                <span className="inline-block w-4 h-4 bg-yellow-400 mr-2"></span>
                <span className="font-bold">LEGENDARY</span> - Extremely rare cards with game-changing abilities
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
