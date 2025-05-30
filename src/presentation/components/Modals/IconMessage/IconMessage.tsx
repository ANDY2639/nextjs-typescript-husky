"use client";

import { Button, Modal, ModalBody, ModalContent } from "@heroui/react";

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  btnText: string;
  icon: React.ReactNode;
  onClose: () => void;
};

const IconMessage: React.FC<Props> = ({ isOpen, icon, btnText, title, description, onClose }) => {
  return (
    <Modal size="xl" placement="center" hideCloseButton={true} isDismissable={false} isKeyboardDismissDisabled={true} isOpen={isOpen}>
      <ModalContent>
        <ModalBody className="flex flex-col items-center justify-center gap-4 rounded-sm p-8">
          <header className="flex items-center justify-center">
            <div className="bg-default-100 rounded-[64px] p-3.5">{icon}</div>
          </header>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <h4 className="text-center text-2xl font-bold not-italic">{title}</h4>
              <p className="text-medium text-default-500 text-center leading-6 font-medium not-italic">{description}</p>
            </div>
            <Button className="rounded-sm" size="lg" color="primary" onPress={onClose}>
              {btnText}
            </Button>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IconMessage;
