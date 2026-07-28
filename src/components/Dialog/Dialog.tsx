import { forwardRef } from 'react'
import type { ReactNode, ForwardedRef } from 'react'
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import * as closeModule from '@mui/icons-material/Close'
const CloseIcon = closeModule.default
import type { SxProps, Theme, Breakpoint } from '@mui/material'
import { Button } from '../Button/Button'
import './Dialog.css'

export type DialogType = 'confirm' | 'delete' | 'save' | 'logout' | 'error' | 'success' | 'info'

export interface DialogProps {
  open: boolean
  onClose?: () => void
  title?: string
  subtitle?: string
  children?: ReactNode
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string | null
  confirmDisabled?: boolean
  cancelDisabled?: boolean
  loading?: boolean
  loadingText?: string
  confirmStartIcon?: ReactNode
  cancelStartIcon?: ReactNode
  fullWidth?: boolean
  maxWidth?: Breakpoint
  showCloseButton?: boolean
  hideActions?: boolean
  hideHeader?: boolean
  type?: DialogType
  customActions?: ReactNode
  disableBackdropClick?: boolean
  disableEscapeKeyDown?: boolean
  className?: string
  sx?: SxProps<Theme>
}

const DIALOG_PRESETS: Record<
  string,
  { title: string; confirmText: string; cancelText: string | null }
> = {
  confirm: { title: 'Confirmation', confirmText: 'Confirm', cancelText: 'Cancel' },
  delete: { title: 'Confirm Delete', confirmText: 'Delete', cancelText: 'Cancel' },
  save: { title: 'Save Changes', confirmText: 'Save', cancelText: 'Cancel' },
  logout: { title: 'Confirm Logout', confirmText: 'Logout', cancelText: 'Stay' },
  error: { title: 'Error', confirmText: 'OK', cancelText: null },
  success: { title: 'Success', confirmText: 'OK', cancelText: null },
  info: { title: 'Information', confirmText: 'Got it', cancelText: null },
}

export const Dialog = forwardRef(function Dialog(
  {
    open,
    onClose,
    title,
    subtitle,
    children,
    onConfirm,
    confirmText,
    cancelText,
    confirmDisabled = false,
    cancelDisabled = false,
    loading = false,
    loadingText,
    confirmStartIcon,
    cancelStartIcon,
    fullWidth = true,
    maxWidth = 'sm',
    showCloseButton = false,
    hideActions = false,
    hideHeader = false,
    type,
    customActions,
    disableBackdropClick = true,
    disableEscapeKeyDown = false,
    className = '',
    sx,
  }: DialogProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const preset = type ? DIALOG_PRESETS[type] : undefined

  const resolvedTitle = title ?? preset?.title ?? ''
  const resolvedConfirmText = confirmText ?? preset?.confirmText ?? 'Confirm'
  const resolvedCancelText =
    cancelText !== undefined ? cancelText : (preset?.cancelText ?? null)

  const classNames = ['myorg-dialog', className].filter(Boolean).join(' ')

  return (
    <MuiDialog
      ref={ref}
      open={open}
      onClose={(_event, reason) => {
        if (disableBackdropClick && reason === 'backdropClick') return
        if (disableEscapeKeyDown && reason === 'escapeKeyDown') return
        onClose?.()
      }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      className={classNames}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { xs: '90%', sm: '400px' },
          maxWidth: { xs: '90%', md: '600px' },
          width: '100%',
          margin: { xs: 1, sm: 2 },
          borderRadius: 2,
        },
        ...sx,
      }}
      disableScrollLock
    >
      {!hideHeader && (
        <DialogTitle className="myorg-dialog__title">
          <Box className="myorg-dialog__title-text">
            <Typography variant="h6">
              {resolvedTitle}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {showCloseButton && onClose && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              size="small"
              className="myorg-dialog__close"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent className="myorg-dialog__content">
        {children}
      </DialogContent>
      {customActions && (
        <Box className="myorg-dialog__custom-actions">{customActions}</Box>
      )}
      {!hideActions && !customActions && resolvedCancelText !== null && (
        <DialogActions className="myorg-dialog__actions">
          {resolvedCancelText && (
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={cancelDisabled}
              startIcon={cancelStartIcon}
            >
              {resolvedCancelText}
            </Button>
          )}
          {resolvedConfirmText && (
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={confirmDisabled}
              loading={loading}
              loadingText={loadingText ?? undefined}
              startIcon={confirmStartIcon}
            >
              {resolvedConfirmText}
            </Button>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  )
})
