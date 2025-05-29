import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from '@heroui/react';
import React from 'react'

interface BaseModalProps extends ModalProps{
    children: React.ReactNode;     
} 

const BaseModal: React.FC<BaseModalProps> = ({isOpen, title, onClose, children}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
            {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BaseModal