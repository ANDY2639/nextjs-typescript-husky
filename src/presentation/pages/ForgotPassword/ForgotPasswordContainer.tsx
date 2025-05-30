import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { displayTexts, OnboardingSteps } from "@/presentation/forms/components/FormHeader/displayTexts";

const ForgotPasswordContainer = () => {
  const [mfaToken, setMfaToken] = useState("");
  const [display] = useState(displayTexts[OnboardingSteps.FORGOT_PASSWORD]);

  const handleResetMfaToken = () => setMfaToken("");

  return <ForgotPassword display={display} mfaToken={mfaToken} setMfaToken={setMfaToken} onResetMfaToken={handleResetMfaToken} />;
};

export default ForgotPasswordContainer;
