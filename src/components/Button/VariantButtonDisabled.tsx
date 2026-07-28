import { Button, type ButtonProps } from './Button'

export function VariantButtonDisabled({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      disabled
    >
      {children}
    </Button>
  )
}