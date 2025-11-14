import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border-2 border-bank-slate-300 bg-white px-4 py-2 text-sm text-bank-navy-900 transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-bank-slate-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bank-blue-500 focus-visible:border-bank-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bank-slate-50",
          "hover:border-bank-slate-400",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
