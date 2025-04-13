"use client"

import type React from "react"
import { createContext, useEffect, useState, useCallback, useRef } from "react"

interface SoundContextType {
  isMuted: boolean
  toggleMute: () => void
  playSound: (sound: string, loop?: boolean) => void
  stopSound: (sound: string) => void
}

export const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playSound: () => {},
  stopSound: () => {},
})

// Extended sound effects
const SOUNDS = {
  "button-click": "/sounds/click.mp3",
  "card-flip": "/sounds/flip.mp3",
  "card-select": "/sounds/select.mp3",
  success: "/sounds/success.mp3",
  "chest-open": "/sounds/open.mp3",
  swipe: "/sounds/swipe.mp3",
  "timer-tick": "/sounds/tick.mp3",
  "countdown-loop": "/sounds/countdown.mp3",
  "card-reveal-music": "/sounds/reveal-music.mp3",
  "legendary-reveal": "/sounds/legendary.mp3",
  achievement: "/sounds/achievement.mp3",
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [audioCache, setAudioCache] = useState<Record<string, HTMLAudioElement>>({})
  // Use a ref instead of state for playing audio to avoid re-renders
  const playingAudioRef = useRef<Record<string, HTMLAudioElement>>({})

  useEffect(() => {
    // Pre-load sounds
    const cache: Record<string, HTMLAudioElement> = {}

    // In a real app, we would load actual sound files
    // For this example, we'll just create the Audio objects without loading real files
    Object.entries(SOUNDS).forEach(([key, path]) => {
      const audio = new Audio()
      audio.preload = "auto"
      // In a real app, we would set audio.src = path
      cache[key] = audio
    })

    setAudioCache(cache)

    // Initialize mute state from localStorage if available
    const savedMute = localStorage.getItem("corgiverse-muted")
    if (savedMute) {
      setIsMuted(savedMute === "true")
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prevMuted) => {
      const newMuted = !prevMuted
      localStorage.setItem("corgiverse-muted", String(newMuted))

      // Mute/unmute all currently playing audio
      Object.values(playingAudioRef.current).forEach((audio) => {
        audio.muted = newMuted
      })

      return newMuted
    })
  }, [])

  const playSound = useCallback(
    (sound: string, loop = false) => {
      if (!audioCache[sound]) return

      // Stop the sound if it's already playing
      if (playingAudioRef.current[sound]) {
        playingAudioRef.current[sound].pause()
        playingAudioRef.current[sound].currentTime = 0
      }

      // Clone the audio to allow overlapping sounds
      const audio = audioCache[sound].cloneNode() as HTMLAudioElement
      audio.volume = 0.5
      audio.loop = loop
      audio.muted = isMuted

      // Add to playing audio ref
      playingAudioRef.current[sound] = audio

      audio.play().catch(() => {
        // Ignore autoplay errors
      })
    },
    [audioCache, isMuted],
  )

  const stopSound = useCallback((sound: string) => {
    if (playingAudioRef.current[sound]) {
      playingAudioRef.current[sound].pause()
      playingAudioRef.current[sound].currentTime = 0

      // Remove from playing audio ref
      delete playingAudioRef.current[sound]
    }
  }, [])

  return <SoundContext.Provider value={{ isMuted, toggleMute, playSound, stopSound }}>{children}</SoundContext.Provider>
}
