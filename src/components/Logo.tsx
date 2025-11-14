import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizes = {
    sm: { svg: 'h-8 w-8', text: 'text-lg' },
    md: { svg: 'h-10 w-10', text: 'text-xl' },
    lg: { svg: 'h-14 w-14', text: 'text-2xl' },
    xl: { svg: 'h-20 w-20', text: 'text-4xl' },
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        className={sizes[size].svg}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield background representing security */}
        <path
          d="M50 5L15 20V45C15 65 25 80 50 95C75 80 85 65 85 45V20L50 5Z"
          fill="url(#gradient1)"
          stroke="url(#gradient2)"
          strokeWidth="2"
        />

        {/* Vehicle silhouette */}
        <path
          d="M30 50H70L65 40H35L30 50Z"
          fill="white"
          opacity="0.9"
        />
        <circle cx="38" cy="55" r="5" fill="white" opacity="0.9" />
        <circle cx="62" cy="55" r="5" fill="white" opacity="0.9" />

        {/* Checkmark/tick representing verified/approved */}
        <path
          d="M42 45L47 50L58 35"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="15" y1="5" x2="85" y2="95">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="gradient2" x1="15" y1="5" x2="85" y2="95">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent`}>
            MS EXIMP
          </span>
          <span className="text-xs text-slate-600 font-medium -mt-1">
            Hypothecation
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
