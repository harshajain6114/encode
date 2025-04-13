"use client"

import { motion } from "framer-motion"

interface NumberRevealProps {
  number: string
}

export function NumberReveal({ number }: NumberRevealProps) {
  return (
    <div className="w-full bg-[#1a1a2e] border-4 border-[#ffd700] p-4 mb-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <div className="flex justify-center flex-wrap">
          {number.split("").map((digit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotateY: 180 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-10 h-12 m-1 bg-[#1a1a2e] border-2 border-[#ffd700] flex items-center justify-center"
            >
              <span className="text-3xl font-pixel text-[#ffd700]">{digit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
