"use client"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Array of Corgi facts
const CORGI_FACTS = [
  "Corgis were originally bred as herding dogs in Wales.",
  "The Queen of England owned more than 30 Corgis during her lifetime.",
  "Corgis have a 'fairy saddle' marking on their backs where fairies would ride them according to Welsh legend.",
  "Pembroke Welsh Corgis and Cardigan Welsh Corgis are two distinct breeds.",
  "Corgis are known for their 'big dog' bark despite their small size.",
  "A group of Corgis is called a 'blessing'.",
  "Corgis are natural athletes and excel at agility competitions.",
  "The Pembroke Welsh Corgi is one of the smallest herding dogs.",
  "Corgis have webbed feet which help them swim.",
  "The average Corgi can run up to 25 mph.",
  "Corgis were listed as 'vulnerable' in the UK in 2009 but have since gained popularity.",
  "Corgis have double coats that shed heavily twice a year.",
  "The name 'Corgi' comes from Welsh words 'cor' (dwarf) and 'gi' (dog).",
  "Corgis typically live between 12-15 years.",
  "Corgis were recognized as an official breed by the Kennel Club in 1925.",
]

export function CorgiFactToast() {
  const [fact, setFact] = useState("")

  useEffect(() => {
    // Select a random fact
    const randomFact = CORGI_FACTS[Math.floor(Math.random() * CORGI_FACTS.length)]
    setFact(randomFact)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 left-4 z-50 max-w-md"
      >
        <div className="bg-[#1a1a2e] border-4 border-[#ffd700] p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="bg-[#ffd700] p-1.5">
              <Info className="w-5 h-5 text-[#1a1a2e]" />
            </div>
            <div>
              <h4 className="font-pixel text-[#ffd700] text-sm">DID YOU KNOW?</h4>
              <p className="text-white text-sm font-pixel">{fact}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
