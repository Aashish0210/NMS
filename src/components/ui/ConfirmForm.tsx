'use client'

import { FormEvent, ReactNode } from 'react'

interface ConfirmFormProps {
  action: string | ((formData: FormData) => void | Promise<void>)
  message: string
  children: ReactNode
  className?: string
}

export function ConfirmForm({ action, message, children, className }: ConfirmFormProps) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(e: FormEvent) => {
        if (!window.confirm(message)) {
          e.preventDefault()
        }
      }}
    >
      {children}
    </form>
  )
}
