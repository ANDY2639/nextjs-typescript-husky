import LoginForm from "@/presentation/forms/LoginForm";
import FormHeader from "@/presentation/forms/components/FormHeader";
import FormFooter from "@/presentation/forms/components/FormFooter";
import ActivePasswordForm from "@/presentation/forms/ActivePasswordForm";
import { TitleAndSubtitle } from "@/presentation/forms/components/FormHeader/displayTexts";

type Props = {
  flow: string;
  display: TitleAndSubtitle;
  isFirstLogin: boolean;
  mfaToken: string;
  setMfaToken: (mfaToken: string) => void;
  setDisplay: (display: TitleAndSubtitle) => void;
  setIsFirstLogin: (isFirstLogin: boolean) => void;
  onResetMfaToken: () => void;
};

const Login: React.FC<Props> = ({ flow, display, setDisplay, mfaToken, setMfaToken, isFirstLogin, setIsFirstLogin, onResetMfaToken }) => {
  return (
    <>
      <div className="flex max-w-[407px] flex-col items-center justify-center gap-4 p-8 md:h-screen">
        <FormHeader display={display} />
        {isFirstLogin ? (
          <ActivePasswordForm flow={flow} mfaToken={mfaToken} setMfaToken={setMfaToken} onResetMfaToken={onResetMfaToken} />
        ) : (
          <LoginForm
            flow={flow}
            mfaToken={mfaToken}
            setMfaToken={setMfaToken}
            setDisplay={setDisplay}
            setIsFirstLogin={setIsFirstLogin}
            onResetMfaToken={onResetMfaToken}
          />
        )}
        <FormFooter />
      </div>
    </>
  );
};

export default Login;
