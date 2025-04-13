"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { PixelButton } from "@/components/pixel-button"

export function SoundToggle() {
  const { isMuted, toggleMute } = useSound()

  return (
    <PixelButton
      onClick={toggleMute}
      className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] w-10 h-10 p-0 flex items-center justify-center"
    >
      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </PixelButton>
  )
}
