import Link from "next/link";
import { useEffect, useRef } from "react";
import { Alert } from "@/presentation/components/Alert";
import { CloseIcon } from "@/presentation/components/Icons";
import Countdown from "@/presentation/components/Countdown";
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import FormButton from "@/presentation/components/CoreUIX/Form/controls/FormButton";
import FormInputOtp from "@/presentation/components/CoreUIX/Form/controls/FormInputOtp";
import BaseButton from "@/presentation/components/CoreUIX/Form/components/Button/Button";
import { defaultOtpFormValues, otpFormValidationSchema, OtpFormValues } from "./OtpFormConfig";
import FormProvider, { FormProviderMethods } from "@/presentation/components/CoreUIX/Form/context/FormProvider";

type Props = {
  otp: boolean;
  isLoading: boolean;
  isExpiredOtp: boolean;
  disabledForm: boolean;
  enableResendOtp: boolean;
  otpExpiredDate: Date | null;
  onExpireOtp: () => void;
  onSubmitOtp: (values: OtpFormValues) => void | Promise<void>;
  onResetMfaToken: () => void;
  onResendOtp: () => void;
};

const OtpForm: React.FC<Props> = ({
  otp,
  isLoading,
  isExpiredOtp,
  disabledForm,
  enableResendOtp,
  otpExpiredDate,
  onSubmitOtp,
  onResendOtp,
  onExpireOtp,
  onResetMfaToken,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<FormProviderMethods<OtpFormValues>>(null);

  const handleClose = () => {
    onResetMfaToken();
    onClose();
  };

  useEffect(() => {
    if (otp) {
      onOpen();
    }
  }, [otp, onOpen]);

  useEffect(() => {
    if (formRef?.current) {
      formRef.current.resetForm();
    }
  }, [enableResendOtp]);

  return (
    <Modal size="xl" placement="center" hideCloseButton={true} isDismissable={false} isKeyboardDismissDisabled={true} isOpen={isOpen}>
      <ModalContent>
        <ModalBody className="flex flex-col gap-8 p-8">
          <header className="flex items-center justify-between">
            <h3 className="text-large flex-grow font-bold not-italic">Código seguro</h3>
            <Button className="bg-content1 hover:bg-content1 h-auto w-auto min-w-0" isIconOnly aria-label="Close" radius="full" onPress={handleClose}>
              <CloseIcon />
            </Button>
          </header>

          <section className="flex flex-col gap-6">
            <p className="text-small font-regular not-italic">
              Ingresa el código enviado a tu correo electrónico registrado para acceder a tu cuenta.
            </p>

            <FormProvider
              initialValues={defaultOtpFormValues}
              validationSchema={otpFormValidationSchema}
              onSubmit={onSubmitOtp}
              isDisabledForm={disabledForm}
              formRef={formRef as React.RefObject<FormProviderMethods<OtpFormValues>>}
            >
              <div className="flex w-full flex-col items-center gap-2">
                <FormInputOtp name="otpCode" length={6} isDisabled={isExpiredOtp} />

                {isExpiredOtp && <Alert color="danger" hideIconWrapper description="Este código ha expirado. Solicita uno nuevo." />}
                {!isExpiredOtp && otpExpiredDate && (
                  <p className="text-tiny font-regular text-center not-italic">
                    Recuerda que el código tiene una duración de
                    <br />
                    <span className="text-tiny text-primary font-medium not-italic">
                      <Countdown key={otpExpiredDate.toISOString()} date={otpExpiredDate} onComplete={onExpireOtp} /> minutos.
                    </span>
                  </p>
                )}
              </div>

              {isExpiredOtp ? (
                <BaseButton color="primary" className="w-full rounded-sm" onPress={onResendOtp} isLoading={isLoading} isIconOnly={isLoading}>
                  Solicitar código
                </BaseButton>
              ) : (
                <FormButton disabled={(values: OtpFormValues) => values.otpCode.length !== 6}>Enviar</FormButton>
              )}
            </FormProvider>
          </section>

          <footer className="text-tiny font-regular text-center not-italic">
            En caso de no recibir el código de seguridad, ingresa{" "}
            <Link className="text-tiny font-regular text-primary not-italic underline" href="/">
              aquí
            </Link>
          </footer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OtpForm;
