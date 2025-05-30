import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { displayTexts, OnboardingSteps } from "@/presentation/forms/components/FormHeader/displayTexts";
import Login from "./Login";

const LoginContainer = () => {
  const search = useSearchParams();
  const [mfaToken, setMfaToken] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [display, setDisplay] = useState(displayTexts[OnboardingSteps.LOGIN]);

  const flow = useMemo(() => search.get("flow") ?? "", [search]);
  const handleResetMfaToken = () => setMfaToken("");

  useEffect(() => {
    if (flow === "forgot") {
      setDisplay(displayTexts[OnboardingSteps.LOGIN_FORGOT]);
    }
  }, [flow]);

  return (
    <Login
      flow={flow}
      display={display}
      setDisplay={setDisplay}
      mfaToken={mfaToken}
      setMfaToken={setMfaToken}
      isFirstLogin={isFirstLogin}
      setIsFirstLogin={setIsFirstLogin}
      onResetMfaToken={handleResetMfaToken}
    />
  );
};

export default LoginContainer;
