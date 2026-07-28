import { forwardRef, useCallback } from 'react'
import type { ForwardedRef } from 'react'
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material'
import type { SxProps, Theme, TextFieldProps } from '@mui/material'
import './PhoneField.css'

export interface CountryOption {
  _id: string
  name: string
  code: string
  isVisible?: boolean
}

export interface PhoneFieldProps {
  value: string
  onChange: (value: string) => void
  countryCode: string
  onCountryCodeChange: (code: string) => void
  countries?: CountryOption[]
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  variant?: TextFieldProps['variant']
  fullWidth?: boolean
  placeholder?: string
  className?: string
  sx?: SxProps<Theme>
  autoFocus?: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  inputRef?: React.Ref<HTMLInputElement>
}

export const PhoneField = forwardRef(function PhoneField(
  {
    value,
    onChange,
    countryCode,
    onCountryCodeChange,
    countries = [{ _id: 'fallback-india', name: 'India', code: '+91', isVisible: true }],
    label,
    error,
    disabled = false,
    required = false,
    variant = 'standard',
    fullWidth = true,
    placeholder,
    className = '',
    sx,
    autoFocus,
    onKeyDown,
    inputRef,
  }: PhoneFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classNames = ['myorg-phone-field', className].filter(Boolean).join(' ')

  const labelContent = required ? (
    <span>
      {label} <span className="myorg-phone-field__required">*</span>
    </span>
  ) : (
    label
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, '')
      onChange(digits)
    },
    [onChange],
  )

  return (
    <TextField
      ref={ref}
      label={labelContent}
      value={value}
      onChange={handleChange}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      placeholder={placeholder}
      error={!!error}
      helperText={error || ' '}
      className={classNames}
      sx={sx}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Select
              value={countryCode}
              onChange={(e) => onCountryCodeChange(e.target.value)}
              variant={variant}
              className="myorg-phone-field__country-select"
              disabled={disabled}
              MenuProps={{
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                transformOrigin: { vertical: 'top', horizontal: 'left' },
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country._id} value={country.code}>
                  {country.code}
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  )
})
