'use client'

import { useEffect } from "react"
import { useDisclosure } from "@heroui/react"
import IconMessage from "./IconMessage"

type Props = {
  open: boolean
  title: string
  description: string
  btnText: string
  icon: React.ReactNode
  onBeforeClose?: () => void
}

const IconMessageContainer: React.FC<Props> = ({ open, onBeforeClose, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    if (onBeforeClose) {
      onBeforeClose()
    }
    onClose()
  }

  useEffect(() => {
    if (open) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <IconMessage
      isOpen={isOpen}
      onClose={handleClose}
      {...rest}
    />
  )
}

export default IconMessageContainer
