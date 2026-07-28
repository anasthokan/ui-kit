import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode } from 'react'
import { Divider as MuiDivider } from '@mui/material'
import type { DividerProps as MuiDividerProps } from '@mui/material'
import './Divider.css'

export interface DividerProps {
  children?: ReactNode
  orientation?: MuiDividerProps['orientation']
  variant?: MuiDividerProps['variant']
  textAlign?: MuiDividerProps['textAlign']
  flexItem?: boolean
  className?: string
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      children,
      orientation = 'horizontal',
      variant = 'fullWidth',
      textAlign = 'center',
      flexItem = false,
      className = '',
    },
    ref: ForwardedRef<HTMLHRElement>,
  ) => {
    const classNames = [
      'myorg-divider',
      `myorg-divider--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <MuiDivider
        ref={ref}
        orientation={orientation}
        variant={variant}
        textAlign={textAlign}
        flexItem={flexItem}
        className={classNames}
      >
        {children}
      </MuiDivider>
    )
  },
)

Divider.displayName = 'Divider'