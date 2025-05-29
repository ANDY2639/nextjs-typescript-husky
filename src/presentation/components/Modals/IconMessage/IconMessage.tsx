'use client'

import { Button, Modal, ModalBody, ModalContent } from "@heroui/react"

type Props = {
  isOpen: boolean
  title: string
  description: string
  btnText: string
  icon: React.ReactNode
  onClose: () => void
}

const IconMessage: React.FC<Props> = ({ isOpen, icon, btnText, title, description, onClose }) => {
  return (
    <Modal
      size="xl"
      placement="center"
      hideCloseButton={true}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
    >
      <ModalContent>
        <ModalBody className="flex flex-col justify-center items-center gap-4 p-8 rounded-sm">
          <header className="flex justify-center items-center">
            <div className="rounded-[64px] p-3.5 bg-default-100">{icon}</div>
          </header>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <h4 className="text-center text-2xl font-bold not-italic">{title}</h4>
              <p className="text-center text-medium font-medium not-italic leading-6 text-default-500">{description}</p>
            </div>
            <Button
              className="rounded-sm"
              size="lg"
              color="primary"
              onPress={onClose}
            >{btnText}</Button>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default IconMessage
