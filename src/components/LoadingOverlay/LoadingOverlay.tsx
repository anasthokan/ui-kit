import { forwardRef } from 'react'
import type { ReactNode, ForwardedRef } from 'react'
import { Box, CircularProgress, Typography, Fade } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import './LoadingOverlay.css'

export interface LoadingOverlayProps {
  loading: boolean
  children?: ReactNode
  message?: string
  fullScreen?: boolean
  className?: string
  sx?: SxProps<Theme>
}

export const LoadingOverlay = forwardRef(function LoadingOverlay(
  {
    loading,
    children,
    message,
    fullScreen = false,
    className = '',
    sx,
  }: LoadingOverlayProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const classNames = ['myorg-loading-overlay', className].filter(Boolean).join(' ')

  const containerSx: SxProps<Theme> = {
    position: fullScreen ? 'fixed' : 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1300,
    ...sx,
  }

  return (
    <Box ref={ref} className={classNames} sx={{ position: 'relative' }}>
      {children && <Box className="myorg-loading-overlay__content">{children}</Box>}
      <Fade in={loading}>
        <Box className="myorg-loading-overlay__backdrop" sx={containerSx}>
          <CircularProgress className="myorg-loading-overlay__spinner" />
          {message && (
            <Typography
              variant="body2"
              className="myorg-loading-overlay__message"
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Fade>
    </Box>
  )
})
