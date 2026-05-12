'use client'

import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface ConfirmButtonProps {
  message: string
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ConfirmButton({ message, children, className, variant, size }: ConfirmButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) {
          e.preventDefault()
        }
      }}
    >
      {children}
    </Button>
  )
}
