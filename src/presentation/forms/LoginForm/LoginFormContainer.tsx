import { use, useState } from "react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import ApiError from "@/domain/entity/Error/ApiError";
import { useAppDispatch } from "@/presentation/hooks/useStore";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/entity/Types/UseCaseTypes";
import { LoginFormValues, loginInitialValues } from "./LoginFormConfig";
import { startSession } from "@/presentation/redux/features/user/userSlice";
import OnboardingUseCase from "@/domain/interactors/Auth/OnboardingUseCase";
import InitialLoadUseCase from "@/domain/interactors/InitialLoad/InitialLoadUseCase";
import OtpForm, { OtpFormValues } from "@/presentation/components/Modals/OtpForm";
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext";
import LocalStorageHelper, { StorageKeys } from "@/presentation/helpers/LocalStorageHelper";
import { displayTexts, OnboardingSteps, TitleAndSubtitle } from "../components/FormHeader/displayTexts";
import LoginForm from "./LoginForm";

type Props = {
  flow: string;
  mfaToken: string;
  setMfaToken: (mfaToken: string) => void;
  setDisplay: (display: TitleAndSubtitle) => void;
  setIsFirstLogin: (isFirstLogin: boolean) => void;
  onResetMfaToken: () => void;
};

const LoginFormContainer: React.FC<Props> = ({ flow, mfaToken, setMfaToken, setDisplay, setIsFirstLogin, onResetMfaToken }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSubmit } = use(FormContext);
  const [loginFormValues, setLoginFormValues] = useState(loginInitialValues);
  const onboardingUC = container.get<OnboardingUseCase>(UseCaseTypes.OnboardingUseCase);
  const initialLoadUC = container.get<InitialLoadUseCase>(UseCaseTypes.InitialLoadUseCase);

  const handleLoginOtp = async (values: LoginFormValues) => {
    try {
      const response = await onboardingUC.requestLoginOtp(values.username, values.password);
      setMfaToken(response.mfaToken);
      setLoginFormValues(values);
    } catch (error) {
      if (error instanceof ApiError && error.code === 1031010) {
        setDisplay(displayTexts[OnboardingSteps.REGISTER]);
        setIsFirstLogin(true);
        LocalStorageHelper.setItem(StorageKeys.FIRST_LOGIN, {
          isFirstLogin: flow === "forgot" ? false : true,
          isCompleted: false,
        });
      }
      console.log(error);
    }
  };

  const handleVerifyLoginOtp = async (values: OtpFormValues) => {
    try {
      await onboardingUC.verifyLoginOtp(values.otpCode);
      const userState = await initialLoadUC.startSession();
      dispatch(startSession(userState));
      addToast({ description: "Inicio de sesión exitoso", color: "success" });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefirectForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleResendOtp = async () => {
    try {
      if (loginFormValues) {
        const response = await onboardingUC.requestLoginOtp(loginFormValues.username, loginFormValues.password);
        setMfaToken(response.mfaToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginForm flow={flow} isSubmit={isSubmit} onSubmit={handleLoginOtp} onForgotPassword={handleRefirectForgotPassword} />
      {mfaToken && <OtpForm otp={!!mfaToken} onResendOtp={handleResendOtp} onValidateOtp={handleVerifyLoginOtp} onResetMfaToken={onResetMfaToken} />}
    </>
  );
};

export default LoginFormContainer;
