import { Alert, AlertProps } from "@heroui/react"

const BaseAlert: React.FC<AlertProps> = (props) => {
  return (
    <Alert
      classNames={{
        base: [
          "text-danger-500",
          "py-3 px-3",
          "rounded-[1rem]",
        ],
      }}
      {...props}
    />
  )
}

export default BaseAlert
