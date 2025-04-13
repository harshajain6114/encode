"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Power-up types
export type PowerUpType = "speed" | "jump" | "fluffiness" | "barkPower" | "napSkills"

// Power-up interface
export interface PowerUp {
  type: PowerUpType
  value: number
  expiresAt: number
}

// User data interface
export interface UserData {
  name: string
  corgiTokens: number
  highestPowerLevel: number
  totalScore: number
  dailyPlays: number
  lastPlayDate: string
  powerUps: PowerUp[]
  playHistory: {
    date: string
    powerLevel: number
  }[]
}

// Default user data
const defaultUserData: UserData = {
  name: "",
  corgiTokens: 100,
  highestPowerLevel: 0,
  totalScore: 0,
  dailyPlays: 0,
  lastPlayDate: new Date().toISOString().split("T")[0],
  powerUps: [],
  playHistory: [],
}

// Context interface
interface UserContextType {
  userData: UserData
  setUserName: (name: string) => void
  addCorgiTokens: (amount: number) => void
  updatePowerLevel: (powerLevel: number) => void
  addPowerUp: (type: PowerUpType, value: number, durationMinutes: number) => void
  hasPowerUp: (type: PowerUpType) => boolean
  getPowerUpValue: (type: PowerUpType) => number
  incrementDailyPlays: () => boolean
  resetDailyPlays: () => void
  canPlay: boolean
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [canPlay, setCanPlay] = useState(true)

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("corgiverse-user")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)

      // Check if it's a new day to reset daily plays
      const today = new Date().toISOString().split("T")[0]
      if (parsedData.lastPlayDate !== today) {
        setUserData((prev) => ({
          ...prev,
          dailyPlays: 0,
          lastPlayDate: today,
        }))
      }

      // Check if user can play (daily limit is 5)
      setCanPlay(parsedData.dailyPlays < 5)
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("corgiverse-user", JSON.stringify(userData))
  }, [userData])

  // Set user name
  const setUserName = (name: string) => {
    setUserData((prev) => ({ ...prev, name }))
  }

  // Add Corgi tokens
  const addCorgiTokens = (amount: number) => {
    setUserData((prev) => ({ ...prev, corgiTokens: prev.corgiTokens + amount }))
  }

  // Update power level
  const updatePowerLevel = (powerLevel: number) => {
    setUserData((prev) => {
      const newHighest = Math.max(prev.highestPowerLevel, powerLevel)
      const newTotalScore = prev.totalScore + powerLevel
      const today = new Date().toISOString().split("T")[0]

      return {
        ...prev,
        highestPowerLevel: newHighest,
        totalScore: newTotalScore,
        playHistory: [...prev.playHistory, { date: today, powerLevel }],
      }
    })
  }

  // Add power-up
  const addPowerUp = (type: PowerUpType, value: number, durationMinutes: number) => {
    const expiresAt = Date.now() + durationMinutes * 60 * 1000

    setUserData((prev) => {
      // Remove any existing power-up of the same type
      const filteredPowerUps = prev.powerUps.filter((p) => p.type !== type)

      return {
        ...prev,
        powerUps: [...filteredPowerUps, { type, value, expiresAt }],
      }
    })
  }

  // Check if user has a power-up
  const hasPowerUp = (type: PowerUpType) => {
    // Clean expired power-ups
    const now = Date.now()
    const validPowerUps = userData.powerUps.filter((p) => p.expiresAt > now)

    if (validPowerUps.length !== userData.powerUps.length) {
      setUserData((prev) => ({
        ...prev,
        powerUps: validPowerUps,
      }))
    }

    return validPowerUps.some((p) => p.type === type)
  }

  // Get power-up value
  const getPowerUpValue = (type: PowerUpType) => {
    const now = Date.now()
    const powerUp = userData.powerUps.find((p) => p.type === type && p.expiresAt > now)
    return powerUp ? powerUp.value : 0
  }

  // Increment daily plays
  const incrementDailyPlays = () => {
    const today = new Date().toISOString().split("T")[0]

    // If it's a new day, reset daily plays
    if (userData.lastPlayDate !== today) {
      setUserData((prev) => ({
        ...prev,
        dailyPlays: 1,
        lastPlayDate: today,
      }))
      return true
    }

    // Check if daily limit reached
    if (userData.dailyPlays >= 5) {
      setCanPlay(false)
      return false
    }

    // Increment daily plays
    setUserData((prev) => ({
      ...prev,
      dailyPlays: prev.dailyPlays + 1,
    }))

    // Update canPlay state
    setCanPlay(userData.dailyPlays + 1 < 5)
    return true
  }

  // Reset daily plays
  const resetDailyPlays = () => {
    const today = new Date().toISOString().split("T")[0]
    setUserData((prev) => ({
      ...prev,
      dailyPlays: 0,
      lastPlayDate: today,
    }))
    setCanPlay(true)
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserName,
        addCorgiTokens,
        updatePowerLevel,
        addPowerUp,
        hasPowerUp,
        getPowerUpValue,
        incrementDailyPlays,
        resetDailyPlays,
        canPlay,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Hook to use the user context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
