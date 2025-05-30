import Link from "next/link";
import FormHeader from "@/presentation/forms/components/FormHeader";
import ForgotPasswordForm from "@/presentation/forms/ForgotPasswordForm";
import { TitleAndSubtitle } from "@/presentation/forms/components/FormHeader/displayTexts";

type Props = {
  display: TitleAndSubtitle;
  mfaToken: string;
  setMfaToken: (mfaToken: string) => void;
  onResetMfaToken: VoidFunction;
};

const ForgotPassword: React.FC<Props> = ({ display, mfaToken, setMfaToken, onResetMfaToken }) => {
  return (
    <div className="flex max-w-[407px] flex-col items-center justify-center gap-4 p-8 md:h-screen">
      <FormHeader display={display} />
      <ForgotPasswordForm mfaToken={mfaToken} setMfaToken={setMfaToken} onResetMfaToken={onResetMfaToken} />
      <p className="text-small font-regular text-center text-ellipsis whitespace-nowrap not-italic">
        Volver al{" "}
        <Link href="/login" className="text-primary">
          inicio de sesión
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
