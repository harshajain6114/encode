import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg"
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center font-pixel tracking-wider",
          "transition-transform active:translate-y-1 active:border-b-0 active:mb-1",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd700]",
          size === "default" && "px-4 py-2 text-base",
          size === "sm" && "px-2 py-1 text-sm",
          size === "lg" && "px-6 py-3 text-lg",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

PixelButton.displayName = "PixelButton"
