import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode } from 'react'
import { Grid as MuiGrid } from '@mui/material'
import type { GridProps as MuiGridProps } from '@mui/material'

import './Grid.css'

export interface GridProps extends MuiGridProps {
  children?: ReactNode
  className?: string
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className = '',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: any,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const classNames = [
      'myorg-grid',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const sizeObj: any = {}
    if (xs !== undefined) sizeObj.xs = xs
    if (sm !== undefined) sizeObj.sm = sm
    if (md !== undefined) sizeObj.md = md
    if (lg !== undefined) sizeObj.lg = lg
    if (xl !== undefined) sizeObj.xl = xl

    const sizeProp = Object.keys(sizeObj).length > 0 ? { size: sizeObj } : {}

    return (
      <MuiGrid
        ref={ref}
        className={classNames}
        {...sizeProp}
        {...props}
      >
        {children}
      </MuiGrid>
    )
  },
)

Grid.displayName = 'Grid'