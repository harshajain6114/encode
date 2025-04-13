"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TraitBarProps {
  icon: ReactNode
  name: string
  value: number
  maxValue?: number
  delay?: number
}

export function TraitBar({ icon, name, value, maxValue = 9, delay = 0 }: TraitBarProps) {
  const percentage = (value / maxValue) * 100

  return (
    <div className="bg-[#1a1a2e] p-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {icon}
          <span className="font-pixel text-white ml-2">{name}</span>
        </div>
        <span className="font-pixel text-[#ffd700]">
          {value}/{maxValue}
        </span>
      </div>
      <div className="h-4 bg-white">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay }}
          className="h-full bg-[#ffd700]"
        />
      </div>
    </div>
  )
}
