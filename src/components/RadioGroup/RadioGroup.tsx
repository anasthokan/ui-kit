import { forwardRef } from 'react'
import type { ForwardedRef, ChangeEvent } from 'react'
import {
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio as MuiRadio,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import './RadioGroup.css'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  name?: string
  row?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit' | 'textPrimary' | 'textSecondary'
  className?: string
  sx?: SxProps<Theme>
  ariaLabelledBy?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options = [],
      value,
      onChange,
      name = 'radio-group',
      row = false,
      disabled = false,
      size = 'medium',
      color = 'primary',
      className = '',
      sx,
      ariaLabelledBy,
      children,
    }: any,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const classNames = ['myorg-radio-group', className]
      .filter(Boolean)
      .join(' ')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e, e.target.value)
    }

    return (
      <MuiRadioGroup
        ref={ref}
        name={name}
        value={value}
        onChange={handleChange}
        row={row}
        className={classNames}
        sx={sx}
        aria-labelledby={ariaLabelledBy}
      >
        {children ? (
          children
        ) : Array.isArray(options) && options.length > 0 ? (
          options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<MuiRadio size={size} color={color as "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"} />}
              label={option.label}
              disabled={option.disabled || disabled}
              className={`myorg-radio-group__label myorg-radio-group__label--${size}`}
            />
          ))
        ) : (
          <span style={{ color: '#999', fontSize: '0.875rem' }}>No options available</span>
        )}
      </MuiRadioGroup>
    )
  },
)
