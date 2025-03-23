'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4 border rounded-full', className)}
      {...props}
    >
      {/* Outer white circle */}
      <circle cx="128" cy="128" r="120" fill="white" />
      {/* Robot head as a rounded square */}
      <rect x="48" y="56" width="160" height="144" rx="24" fill="black" />
      {/* Eyes */}
      <circle cx="88" cy="112" r="12" fill="white" />
      <circle cx="168" cy="112" r="12" fill="white" />
      {/* Curved smile */}
      <path
        d="M88 160 Q128 180 168 160"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left Antenna */}
      <line
        x1="96"
        y1="56"
        x2="96"
        y2="32"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="96" cy="24" r="4" fill="white" />
      {/* Right Antenna */}
      <line
        x1="160"
        y1="56"
        x2="160"
        y2="32"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="160" cy="24" r="4" fill="white" />
    </svg>
  )
}

export { IconLogo }
