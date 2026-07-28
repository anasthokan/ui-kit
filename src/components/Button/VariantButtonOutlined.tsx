import { Button, type ButtonProps } from './Button'

export function VariantButtonOutlined({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      variant="secondary"
    >
      {children}
    </Button>
  )
}