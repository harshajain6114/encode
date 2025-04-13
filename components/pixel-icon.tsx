import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PixelIconProps {
  className?: string
  children: ReactNode
}

export function PixelIcon({ className, children }: PixelIconProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        "w-8 h-8 bg-[#ffd700] text-[#1a1a2e] rounded-none",
        "border-2 border-[#1a1a2e]",
        className,
      )}
    >
      {children}
    </div>
  )
}
