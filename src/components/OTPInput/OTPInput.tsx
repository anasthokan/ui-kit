import { useRef, useCallback, useEffect } from 'react'
import type { KeyboardEvent, ClipboardEvent } from 'react'
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import './OTPInput.css'

export interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  label?: string
  error?: string
  disabled?: boolean
  className?: string
  sx?: SxProps<Theme>
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  label,
  error,
  disabled = false,
  className = '',
  sx,
  onKeyDown,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus()
    }
  }, [length])

  const handleChange = useCallback(
    (index: number, digit: string) => {
      if (disabled) return
      if (!/^\d*$/.test(digit)) return

      const otpArray = value.split('')
      otpArray[index] = digit.slice(-1)
      const newOtp = otpArray.join('')

      onChange(newOtp)

      if (digit && index < length - 1) {
        focusInput(index + 1)
      }
    },
    [disabled, value, onChange, length, focusInput],
  )

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        if (!value[index] && index > 0) {
          const otpArray = value.split('')
          otpArray[index - 1] = ''
          onChange(otpArray.join(''))
          focusInput(index - 1)
        } else {
          const otpArray = value.split('')
          otpArray[index] = ''
          onChange(otpArray.join(''))
        }
      }
    },
    [value, onChange, focusInput],
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (disabled) return
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      onChange(pasted)
      const nextIndex = Math.min(pasted.length, length - 1)
      focusInput(nextIndex)
    },
    [disabled, length, onChange, focusInput],
  )

  const classNames = ['myorg-otp-input', className].filter(Boolean).join(' ')

  return (
    <Box className={classNames} sx={sx} onKeyDown={onKeyDown}>
      {label && (
        <Typography variant="body2" className="myorg-otp-input__label" gutterBottom>
          {label}
        </Typography>
      )}
      <Box
        className="myorg-otp-input__boxes"
        onPaste={handlePaste}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={disabled}
            className={`myorg-otp-input__box ${error ? 'myorg-otp-input__box--error' : ''}`}
          />
        ))}
      </Box>
      {error && (
        <Typography variant="caption" className="myorg-otp-input__error">
          {error}
        </Typography>
      )}
    </Box>
  )
}
