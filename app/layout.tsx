import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import "./globals.css"
import { SoundProvider } from "@/components/sound-provider"
import ContextProvider from "./providers"

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

export const metadata: Metadata = {
  title: "CorgiVerse - Gamified Mystery Card Game",
  description: "Collect, trade, and solve mysteries with adorable Corgis!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pixelFont.className}>
        <ContextProvider>
          <SoundProvider>{children}</SoundProvider>
        </ContextProvider>
      </body>
    </html>
  )
}


import './globals.css'