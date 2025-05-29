import Link from "next/link";
import FormHeader from "@/presentation/forms/components/FormHeader";
import ForgotPasswordForm from "@/presentation/forms/ForgotPasswordForm";
import { TitleAndSubtitle } from "@/presentation/forms/components/FormHeader/displayTexts";

type Props = {
  display: TitleAndSubtitle;
  mfaToken: string;
  setMfaToken: (mfaToken: string) => void;
  onResetMfaToken: VoidFunction;
}

const ForgotPassword: React.FC<Props> = ({ display, mfaToken, setMfaToken, onResetMfaToken }) => {
  return (
    <div className="flex flex-col max-w-[407px] gap-4 items-center justify-center md:h-screen p-8">
      <FormHeader display={display} />
      <ForgotPasswordForm
        mfaToken={mfaToken}
        setMfaToken={setMfaToken}
        onResetMfaToken={onResetMfaToken}
      />
      <p className="text-center text-small font-regular not-italic whitespace-nowrap text-ellipsis">
        Volver al{" "}
        <Link href="/login" className="text-primary">inicio de sesión</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
