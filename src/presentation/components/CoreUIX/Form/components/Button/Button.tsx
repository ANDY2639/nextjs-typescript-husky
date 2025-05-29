import { Button, ButtonProps } from '@heroui/button';

export interface BaseButtonProps extends ButtonProps {
  children: React.ReactNode
  minWidth?: string
}

const BaseButton: React.FC<BaseButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      size='lg'
      {...rest}
    >{children}</Button>
  )
}

export default BaseButton