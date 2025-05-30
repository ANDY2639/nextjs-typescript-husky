import PasswordStrengthMeterItem from "./components/PasswordStrengthMeterItem";
import ProgressIndicator from "./components/ProgressIndicator/ProgressIndicator";

type Props = {
  includesAnLowerCaseAndNumber: boolean;
  includesAnUpperCase: boolean;
  hasSpecialCharacter: boolean;
  hasMinCharacters: boolean;
  isMatchPassword: boolean;
  progressValue: number;
};

const PasswordStrengthMeter: React.FC<Props> = ({
  includesAnLowerCaseAndNumber,
  includesAnUpperCase,
  hasSpecialCharacter,
  hasMinCharacters,
  isMatchPassword,
  progressValue,
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <ProgressIndicator value={progressValue} />
      <div className="flex flex-col items-start gap-1">
        <PasswordStrengthMeterItem validator={includesAnUpperCase} text="Incluye al menos una letra mayúscula." />
        <PasswordStrengthMeterItem validator={includesAnLowerCaseAndNumber} text="Incluye al menos una letra minúscula y un número." />
        <PasswordStrengthMeterItem validator={hasMinCharacters} text="Tiene 8 caracteres." />
        <PasswordStrengthMeterItem validator={hasSpecialCharacter} text="Al menos un carácter especial (!@#$%^&*.)" />
        <PasswordStrengthMeterItem validator={isMatchPassword} text="Las contraseñas coinciden." />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
