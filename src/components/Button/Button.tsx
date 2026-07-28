import { forwardRef } from 'react'
import type { ReactNode, ForwardedRef } from 'react'
import { Button as MuiButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import type { SxProps, Theme } from '@mui/material'
import './Button.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  loading?: boolean
  loadingText?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  children?: ReactNode
  className?: string
  sx?: SxProps<Theme>
}

const variantMap: Record<string, 'contained' | 'outlined' | 'text'> = {
  primary: 'contained',
  secondary: 'outlined',
  ghost: 'text',
}

const sizeMap: Record<string, 'small' | 'medium' | 'large'> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
}

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    color,
    loading = false,
    loadingText,
    startIcon,
    endIcon,
    fullWidth = false,
    disabled = false,
    onClick,
    children,
    className = '',
    sx,
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const muiVariant = variantMap[variant] ?? 'contained'
  const muiSize = sizeMap[size] ?? 'medium'

  const classNames = [
    'myorg-button',
    `myorg-button--${variant}`,
    `myorg-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (loading) {
    return (
      <LoadingButton
        ref={ref}
        loading
        loadingPosition={loadingText && startIcon ? 'start' : 'center'}
        loadingIndicator={loadingText}
        variant={muiVariant}
        size={muiSize}
        color={color}
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={onClick}
        className={classNames}
        sx={sx}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {children}
      </LoadingButton>
    )
  }

  return (
    <MuiButton
      ref={ref}
      variant={muiVariant}
      size={muiSize}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      className={classNames}
      sx={sx}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </MuiButton>
  )
})
