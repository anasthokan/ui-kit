import { forwardRef } from 'react'
import type { ForwardedRef } from 'react'
import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepButton,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import './Stepper.css'

export interface StepperProps {
  steps: string[]
  activeStep: number
  onStepClick?: (step: number) => void
  className?: string
  sx?: SxProps<Theme>
}

export const Stepper = forwardRef(function Stepper(
  {
    steps,
    activeStep,
    onStepClick,
    className = '',
    sx,
  }: StepperProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const classNames = ['myorg-stepper', className].filter(Boolean).join(' ')

  return (
    <MuiStepper
      ref={ref}
      activeStep={activeStep}
      className={classNames}
      sx={sx}
    >
      {steps.map((label, index) => (
        <Step key={label} className="myorg-stepper__step">
          {onStepClick ? (
            <StepButton
              onClick={() => onStepClick(index)}
              className="myorg-stepper__button"
            >
              {label}
            </StepButton>
          ) : (
            <StepLabel className="myorg-stepper__label">{label}</StepLabel>
          )}
        </Step>
      ))}
    </MuiStepper>
  )
})
