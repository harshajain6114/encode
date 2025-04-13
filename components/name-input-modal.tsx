"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { PixelButton } from "./pixel-button"
import { useUser } from "@/app/context/user-context"
import { useSound } from "@/hooks/use-sound"

interface NameInputModalProps {
  onComplete: () => void
}

export function NameInputModal({ onComplete }: NameInputModalProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { setUserName, userData } = useUser()
  const { playSound } = useSound()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters")
      return
    }

    if (name.length > 15) {
      setError("Name must be less than 15 characters")
      return
    }

    playSound("button-click")
    setUserName(name)
    onComplete()
  }

  // If user already has a name, skip this modal
  if (userData.name) {
    onComplete()
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-[#f0f0f8] border-8 border-[#1a1a2e] p-6"
      >
        <h2 className="text-3xl font-pixel text-[#1a1a2e] text-center mb-6 border-b-4 border-[#ffd700] pb-2">
          WELCOME TO CORGIVERSE
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-pixel text-[#1a1a2e] mb-2">
              ENTER YOUR NAME:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              className="w-full px-4 py-3 bg-white border-4 border-[#1a1a2e] font-pixel text-[#1a1a2e] focus:outline-none focus:border-[#ffd700]"
              placeholder="CORGI MASTER"
              autoFocus
            />
            {error && <p className="mt-2 text-red-600 font-pixel text-sm">{error}</p>}
          </div>

          <div className="flex justify-center">
            <PixelButton
              type="submit"
              className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffea00] border-b-4 border-[#cc9900] px-6 py-3 text-lg font-pixel"
            >
              START ADVENTURE
            </PixelButton>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
