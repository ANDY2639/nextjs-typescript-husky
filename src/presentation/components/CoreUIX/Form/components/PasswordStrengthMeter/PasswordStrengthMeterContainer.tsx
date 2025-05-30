import { useContext, useEffect, useState } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import FormContext from "../../context/FormContext";

const PasswordStrengthMeterContainer = () => {
  const [includesAnLowerCaseAndMinOneNumber, setIncludesAnLowerCaseAndMinOneNumber] = useState(false);
  const [includesAnUpperCase, setIncludesAnUpperCase] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasMinCharacters, setHasMinCharacters] = useState(false);
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const { values, setIsDisabledSubmit } = useContext(FormContext);

  const TOTAL_CHECKS = 5;
  const passedChecks = [includesAnLowerCaseAndMinOneNumber, includesAnUpperCase, hasSpecialCharacter, hasMinCharacters, isMatchPassword].filter(
    Boolean,
  ).length;

  const progressValue = (passedChecks / TOTAL_CHECKS) * 100;

  const verifyPassword = () => {
    const specialCharacterRx = /[!@#$%^&*.]/;
    const upperCaseRx = /[A-ZÑÁÉÍÓÚÄËÏÖÜ]/;
    const lowerCaseAndMinOneNumberRx = /^(?=.*[a-zñáéíóúäëïöü])(?=(.*\d)+).+$/;
    const password = values.newPassword || "";

    setHasSpecialCharacter(specialCharacterRx.test(password));
    setIncludesAnUpperCase(upperCaseRx.test(password));
    setIncludesAnLowerCaseAndMinOneNumber(lowerCaseAndMinOneNumberRx.test(password));
    setHasMinCharacters(password.length >= 8);
    setIsMatchPassword(password && values.newPasswordConfirm ? password === values.newPasswordConfirm : false);
  };

  useEffect(() => {
    verifyPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (includesAnLowerCaseAndMinOneNumber && includesAnUpperCase && hasMinCharacters && hasSpecialCharacter && isMatchPassword) {
      setIsDisabledSubmit(false);
    } else {
      setIsDisabledSubmit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includesAnLowerCaseAndMinOneNumber, includesAnUpperCase, hasMinCharacters, isMatchPassword]);

  return (
    <PasswordStrengthMeter
      includesAnLowerCaseAndNumber={includesAnLowerCaseAndMinOneNumber}
      includesAnUpperCase={includesAnUpperCase}
      hasSpecialCharacter={hasSpecialCharacter}
      hasMinCharacters={hasMinCharacters}
      isMatchPassword={isMatchPassword}
      progressValue={progressValue}
    />
  );
};

export default PasswordStrengthMeterContainer;
