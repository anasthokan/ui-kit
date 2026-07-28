import { forwardRef } from 'react'
import type { ReactNode, ForwardedRef } from 'react'
import { Card as MuiCard, CardContent, CardHeader, CardActions } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import './Card.css'

export interface CardProps {
  variant?: 'elevated' | 'outlined' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevation?: number
  title?: string
  titleAction?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  className?: string
  sx?: SxProps<Theme>
}

const paddingMap: Record<string, string> = {
  none: '0px',
  sm: '12px',
  md: '24px',
  lg: '40px',
}

export const Card = forwardRef(function Card(
  {
    variant = 'elevated',
    padding = 'md',
    elevation,
    title,
    titleAction,
    actions,
    children,
    className = '',
    sx,
  }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const paddingVal = paddingMap[padding] ?? '24px'

  const classNames = [
    'myorg-card',
    `myorg-card--${variant}`,
    `myorg-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedElevation =
    variant === 'flat' ? 0 : variant === 'outlined' ? 0 : (elevation ?? 2)

  return (
    <MuiCard
      ref={ref}
      className={classNames}
      elevation={resolvedElevation}
      variant={variant === 'outlined' ? 'outlined' : 'elevation'}
      sx={sx}
    >
      {title && (
        <CardHeader
          title={title}
          action={titleAction}
          className="myorg-card__header"
          titleTypographyProps={{ className: 'myorg-card__title' }}
        />
      )}
      <CardContent
        className="myorg-card__content"
        sx={{
          padding: paddingVal,
          '&:last-child': { paddingBottom: paddingVal },
        }}
      >
        {children}
      </CardContent>
      {actions && (
        <CardActions className="myorg-card__actions">{actions}</CardActions>
      )}
    </MuiCard>
  )
})
