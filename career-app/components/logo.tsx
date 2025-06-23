interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "icon" | "full" | "text"
  className?: string
}

export function CareerHackLogo({ size = "md", variant = "full", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  const LogoIcon = () => (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-3/4 h-3/4 text-white" fill="none">
        {/* Code brackets */}
        <path d="M8 6L4 10L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M16 6L20 10L16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center arrow */}
        <path d="M10 10L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M12.5 8.5L14 10L12.5 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Binary dots */}
        <circle cx="12" cy="16" r="1" fill="currentColor" />
        <circle cx="9" cy="18" r="0.5" fill="currentColor" />
        <circle cx="15" cy="18" r="0.5" fill="currentColor" />
      </svg>
    </div>
  )

  const LogoText = () => (
    <span
      className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent`}
    >
      CareerHack
    </span>
  )

  if (variant === "icon") {
    return <LogoIcon />
  }

  if (variant === "text") {
    return <LogoText />
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  )
}

export default CareerHackLogo
