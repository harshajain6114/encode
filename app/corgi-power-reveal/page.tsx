"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ConfettiEffect } from "@/components/confetti-effect"

export default function CorgiPowerReveal() {
  const [gameState, setGameState] = useState<"initial" | "name-entered" | "stats-revealed">("initial")
  const [corgiName, setCorgiName] = useState("")
  const [powerLevel, setPowerLevel] = useState(0)

  const handleNameSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setPowerLevel(Math.floor(Math.random() * 100))
    setGameState("stats-revealed")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-gray-800"
      >
        Corgi Power Reveal
      </motion.h1>

      {gameState === "initial" && (
        <motion.div
          key="initial"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center"
        >
          <p className="text-lg text-gray-700 mb-4">Enter your Corgi's name to reveal their power level!</p>
          <form onSubmit={handleNameSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Corgi Name"
              value={corgiName}
              onChange={(e) => setCorgiName(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Reveal Power!
            </button>
          </form>
        </motion.div>
      )}

      {gameState === "stats-revealed" && (
        <motion.div
          key="stats-revealed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center"
        >
          {powerLevel > 60 && <ConfettiEffect />}
          <p className="text-2xl font-semibold text-gray-800 mb-2">{corgiName}'s Power Level:</p>
          <p className="text-4xl font-bold text-blue-600 mb-4">{powerLevel}</p>
          <p className="text-lg text-gray-700">
            {powerLevel > 60 ? "Wow! That's a powerful Corgi!" : "A respectable power level!"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
