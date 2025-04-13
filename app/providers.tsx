"use client"

import type { ReactNode } from "react"
import { SoundProvider } from "@/components/sound-provider"
import { UserProvider } from "./context/user-context"

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <SoundProvider>{children}</SoundProvider>
    </UserProvider>
  )
}
