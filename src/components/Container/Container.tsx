import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode } from 'react'
import { Container as MuiContainer } from '@mui/material'
import type { ContainerProps as MuiContainerProps } from '@mui/material'

import './Container.css'

export interface ContainerProps extends MuiContainerProps {
  children?: ReactNode
  className?: string
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    const classNames = ['myorg-container', className]
      .filter(Boolean)
      .join(' ')

    return (
      <MuiContainer
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
      </MuiContainer>
    )
  },
)

Container.displayName = 'Container'
