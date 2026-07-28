import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode } from 'react'
import { Box as MuiBox } from '@mui/material'
import type { BoxProps as MuiBoxProps } from '@mui/material'

import './Box.css'

export interface BoxProps extends MuiBoxProps {
  children?: ReactNode
  className?: string
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className = '', ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    const classNames = ['myorg-box', className]
      .filter(Boolean)
      .join(' ')

    return (
      <MuiBox
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
      </MuiBox>
    )
  },
)

Box.displayName = 'Box'