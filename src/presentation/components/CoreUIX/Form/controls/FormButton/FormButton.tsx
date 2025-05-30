import React, { useContext } from "react";
import { Button, ButtonProps } from "@/presentation/components/CoreUIX/Form/components/Button";
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext";

type FormButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: (values: any) => boolean;
} & Omit<ButtonProps, "disabled">;

const FormButton: React.FC<FormButtonProps> = ({ children, disabled, isLoading, ...rest }) => {
  const { values, isSubmit, isDisabledSubmit, errors } = useContext(FormContext);
  const validDisabled = () => Object.keys(errors).length > 0;
  const isDisabled = disabled ? disabled(values) || validDisabled() : validDisabled();

  return (
    <Button
      className="w-full rounded-sm"
      color={isDisabled ? "default" : "primary"}
      isLoading={isSubmit || isLoading}
      type={isDisabled ? "button" : "submit"}
      isDisabled={isDisabled || isLoading || isDisabledSubmit}
      isIconOnly={isSubmit || isLoading}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FormButton;
