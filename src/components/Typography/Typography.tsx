import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode } from 'react'
import {
  Typography as MuiTypography,
} from '@mui/material'
import type { SxProps, Theme, TypographyVariant } from '@mui/material'
import './Typography.css'

export interface TypographyProps {
  children: ReactNode
  variant?: TypographyVariant
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit' | 'textPrimary' | 'textSecondary'
  component?: React.ElementType
  gutterBottom?: boolean
  noWrap?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  className?: string
  sx?: SxProps<Theme>
  display?: 'initial' | 'block' | 'inline' | 'inline-block'
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold'
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    {
      children,
      variant = 'body1',
      color,
      component,
      gutterBottom = false,
      noWrap = false,
      align = 'inherit',
      className = '',
      sx,
      display,
      fontWeight,
    },
    ref: ForwardedRef<HTMLElement>,
  ) {
    const classNames = ['myorg-typography', className]
      .filter(Boolean)
      .join(' ')

    const defaultComponent = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body1: 'p',
      body2: 'p',
      caption: 'span',
      overline: 'span',
      button: 'span',
      subtitle1: 'p',
      subtitle2: 'p',
    }

    return (
      <MuiTypography
        ref={ref}
        variant={variant}
        color={color}
        component={(component || (defaultComponent[variant as keyof typeof defaultComponent] || 'p')) as React.ElementType}
        gutterBottom={gutterBottom}
        noWrap={noWrap}
        align={align}
        className={classNames}
        sx={{
          ...(display && { display }),
          ...(fontWeight && { fontWeight }),
          ...sx,
        }}
      >
        {children}
      </MuiTypography>
    )
  },
)
