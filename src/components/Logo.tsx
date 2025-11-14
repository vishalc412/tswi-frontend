import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizes = {
    sm: { svg: 'h-8 w-8', text: 'text-base' },
    md: { svg: 'h-10 w-10', text: 'text-lg' },
    lg: { svg: 'h-12 w-12', text: 'text-xl' },
    xl: { svg: 'h-16 w-16', text: 'text-2xl' },
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Professional banking logo - Shield with document */}
      <svg
        className={sizes[size].svg}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield outline - represents security */}
        <path
          d="M50 8L18 22V48C18 66 28 80 50 92C72 80 82 66 82 48V22L50 8Z"
          fill="#0a1929"
          stroke="#334e68"
          strokeWidth="1.5"
        />

        {/* Inner shield highlight */}
        <path
          d="M50 15L25 26V48C25 62 33 73 50 83C67 73 75 62 75 48V26L50 15Z"
          fill="#243b53"
        />

        {/* Document/paper icon in center */}
        <rect x="38" y="35" width="24" height="30" rx="2" fill="white" opacity="0.95" />
        <line x1="42" y1="42" x2="58" y2="42" stroke="#243b53" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="48" x2="58" y2="48" stroke="#243b53" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="54" x2="52" y2="54" stroke="#243b53" strokeWidth="1.5" strokeLinecap="round" />

        {/* Checkmark - represents verification */}
        <path
          d="M40 68L45 73L60 58"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold text-bank-navy-900 tracking-tight`}>
            MS EXIMP
          </span>
          <span className="text-[10px] text-bank-slate-600 font-medium uppercase tracking-wider -mt-0.5">
            Hypothecation
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
