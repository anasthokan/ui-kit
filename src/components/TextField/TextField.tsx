import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode, FocusEvent, KeyboardEvent } from 'react'
import { TextField as MuiTextField } from '@mui/material'
import type { SxProps, Theme, OutlinedInputProps } from '@mui/material'
import './TextField.css'

export interface TextFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  error?: string | boolean
  helperText?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  variant?: 'standard' | 'outlined' | 'filled'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  type?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  InputProps?: Partial<OutlinedInputProps>
  inputRef?: React.Ref<HTMLInputElement>
  className?: string
  sx?: SxProps<Theme>
  autoFocus?: boolean
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
}

export const TextField = forwardRef(function TextField(
  {
    label,
    value,
    onChange,
    error,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    variant = 'standard',
    color = 'primary',
    type,
    placeholder,
    multiline = false,
    rows,
    startAdornment,
    endAdornment,
    InputProps: customInputProps = {},
    inputRef,
    className = '',
    sx,
    autoFocus,
    onFocus,
    onBlur,
    onKeyDown,
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classNames = ['myorg-text-field', className].filter(Boolean).join(' ')

  const labelContent = required ? (
    <span>
      {label} <span className="myorg-text-field__required">*</span>
    </span>
  ) : (
    label
  )

  const combinedInputProps = {
    ...customInputProps,
  }
  if (startAdornment) combinedInputProps.startAdornment = startAdornment
  if (endAdornment) combinedInputProps.endAdornment = endAdornment

  const errorMessage = typeof error === 'string' ? error : undefined
  const hasError = Boolean(error)

  return (
    <MuiTextField
      ref={ref}
      label={labelContent}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
          onChange(e.target.value)
        }
      }}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      color={color}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      error={hasError}
      helperText={errorMessage || helperText || undefined}
      className={classNames}
      sx={sx}
      inputRef={inputRef}
      autoFocus={autoFocus}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      InputProps={Object.keys(combinedInputProps).length > 0 ? combinedInputProps : undefined}
    />
  )
})
