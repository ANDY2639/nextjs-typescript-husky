import { use, useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPassword from "./ForgotPasswordForm";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/entity/Types/UseCaseTypes";
import IconMessage from "@/presentation/components/Modals/IconMessage";
import OnboardingUseCase from "@/domain/interactors/Auth/OnboardingUseCase";
import OtpForm, { OtpFormValues } from "@/presentation/components/Modals/OtpForm";
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext";
import { ForgotPasswordFormValues, forgotPasswordInitialValues } from "./ForgotPasswordFormConfig";
import { LetterUnreadIcon } from "@/presentation/components/Icons";

type Props = {
  mfaToken: string;
  setMfaToken: (mfaToken: string) => void;
  onResetMfaToken: VoidFunction;
};

const ForgotPasswordFormContainer: React.FC<Props> = ({ mfaToken, setMfaToken, onResetMfaToken }) => {
  const router = useRouter();
  const { isSubmit } = use(FormContext);
  const [resendPasswordCompleted, setResendPasswordCompleted] = useState(false);
  const [forgotPasswordFormValues, setForgotPasswordFormValues] = useState(forgotPasswordInitialValues);
  const onboardingUC = container.get<OnboardingUseCase>(UseCaseTypes.OnboardingUseCase);

  const handleSendRecoveryPasswordEmail = async (values: ForgotPasswordFormValues) => {
    try {
      const response = await onboardingUC.sendRecoveryPasswordEmail(values.username);
      setMfaToken(response.mfaToken);
      setForgotPasswordFormValues(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendLoginOtp = async (values: OtpFormValues) => {
    try {
      const response = await onboardingUC.resendLoginOtp(values.otpCode);
      if (response) {
        onResetMfaToken();
        setResendPasswordCompleted(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (forgotPasswordFormValues) {
        const response = await onboardingUC.sendRecoveryPasswordEmail(forgotPasswordFormValues.username);
        setMfaToken(response.mfaToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBeforeClose = () => {
    setResendPasswordCompleted(false);
    router.push("/login?flow=forgot");
  };

  return (
    <>
      <ForgotPassword isSubmit={isSubmit} onSubmit={handleSendRecoveryPasswordEmail} onResetMfaToken={onResetMfaToken} />
      {mfaToken && <OtpForm otp={!!mfaToken} onResendOtp={handleResendOtp} onValidateOtp={handleResendLoginOtp} onResetMfaToken={onResetMfaToken} />}
      {resendPasswordCompleted && (
        <IconMessage
          open={resendPasswordCompleted}
          title="Restablecer contraseña"
          description="Recibirás un correo con las instrucciones para continuar con el proceso."
          btnText="Aceptar"
          icon={<LetterUnreadIcon />}
          onBeforeClose={handleBeforeClose}
        />
      )}
    </>
  );
};

export default ForgotPasswordFormContainer;
