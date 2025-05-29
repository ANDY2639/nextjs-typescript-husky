import { use, useState } from "react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/presentation/hooks/useStore";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/entity/Types/UseCaseTypes";
import OnboardingUseCase from "@/domain/interactors/Auth/OnboardingUseCase";
import InitialLoadUseCase from "@/domain/interactors/InitialLoad/InitialLoadUseCase";
import OtpForm, { OtpFormValues } from "@/presentation/components/Modals/OtpForm";
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext";
import { startSession } from "@/presentation/redux/features/user/userSlice";
import { ActivePasswordFormValues, defaultActivePasswordFormValues } from "./ActivePasswordFormConfig";
import ActivePasswordForm from "./ActivePasswordForm";

type Props = {
  flow: string;
  mfaToken: string;
  setMfaToken: (mfaToken: string) => void;
  onResetMfaToken: () => void;
}

const ActivePasswordFormContainer: React.FC<Props> = ({ flow, mfaToken, setMfaToken, onResetMfaToken }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isSubmit } = use(FormContext)
  const [activeFormValues, setActiveFormValues] = useState(defaultActivePasswordFormValues)
  const onboardingUC = container.get<OnboardingUseCase>(UseCaseTypes.OnboardingUseCase);
  const initialLoadUC = container.get<InitialLoadUseCase>(UseCaseTypes.InitialLoadUseCase);

  const handlePasswordResetOtp = async (values: ActivePasswordFormValues) => {
    try {
      const response = await onboardingUC.requestPasswordResetOtp(values.newPassword)
      setMfaToken(response.mfaToken)
      setActiveFormValues(values)
    } catch (error) {
      console.log({ error })
    }
  }

  const handleVerifyResetPasswordOtp = async (values: OtpFormValues) => {
    try {
      await onboardingUC.verifyResetPasswordOtp(values.otpCode)
      const userState = await initialLoadUC.startSession()
      dispatch(startSession(userState))
      if (flow === 'forgot') {
        addToast({ description: "Contraseña actualizada exitosamente", color: "success" })
      }
      router.push('/')
    } catch (error) {
      console.log({ error })
    }
  }

  const handleResendOtp = async () => {
    try {
      if (activeFormValues) {
        const response = await onboardingUC.requestPasswordResetOtp(activeFormValues.newPassword)
        setMfaToken(response.mfaToken)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ActivePasswordForm
        isSubmit={isSubmit}
        onSubmit={handlePasswordResetOtp}
      />
      {mfaToken && (
        <OtpForm
          otp={!!mfaToken}
          onResendOtp={handleResendOtp}
          onValidateOtp={handleVerifyResetPasswordOtp}
          onResetMfaToken={onResetMfaToken}
        />
      )}
    </>
  )
}

export default ActivePasswordFormContainer
