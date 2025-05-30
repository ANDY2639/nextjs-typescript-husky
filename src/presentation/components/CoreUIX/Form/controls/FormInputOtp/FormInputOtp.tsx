/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from "react";
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext";
import Col, { ColSizing } from "@/presentation/components/CoreUIX/Layout/Col";
import { InputOtp, InputOtpProps } from "@/presentation/components/CoreUIX/Form/components/InputOtp";

type FormInputOtpProps = {
  colSize?: ColSizing;
  disabled?: (values: { [key: string]: string }) => boolean;
  name: string;
} & Omit<InputOtpProps, "error" | "disabled" | "onChange" | "value" | "variant">;

const FormInputOtp: React.FC<FormInputOtpProps> = ({ name, disabled, colSize, ...rest }) => {
  const { values, errors, onChangeField, isSubmit, apiFieldErrors } = useContext(FormContext);
  const value = values[name];
  const error = errors[name];
  const isDisabled = disabled ? disabled(values) : undefined;
  const apiError = useMemo(() => apiFieldErrors.some((fieldError: string) => fieldError === name), [apiFieldErrors]);
  const colSizeProps = colSize ?? {};
  const isInvalid = !!error || apiError;
  const isErrorOrPrimary = isInvalid ? "danger" : "primary";

  return (
    <Col {...colSizeProps}>
      <InputOtp
        {...rest}
        classNames={{
          segmentWrapper: ["w-full", "justify-center"],
          segment: [
            `border-${isErrorOrPrimary}-200`,
            `${rest.isDisabled && "bg-default-200 border-default-200"}`,
            "data-[focus=true]:border-primary-500",
            `data-[active=true]:border-${isErrorOrPrimary}-500`,
            "data-[active=true]:scale-100",
          ],
          errorMessage: ["text-center", "text-small"],
        }}
        variant="bordered"
        size="lg"
        radius="sm"
        value={value}
        disabled={isDisabled || isSubmit}
        isInvalid={isInvalid}
        errorMessage={error}
        onValueChange={(value: string) => onChangeField(name, value)}
        name={name}
      />
    </Col>
  );
};

export default FormInputOtp;
