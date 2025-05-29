/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from "react"
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext"
import {Input, InputProps } from "@/presentation/components/CoreUIX/Form/components/Input"
import Col, { ColSizing } from "@/presentation/components/CoreUIX/Layout/Col"


type FormInputProps = {
  colSize?: ColSizing
  disabled?: (values: {[key: string]: string}) => boolean
  name: string
} & Omit<InputProps, "error" | "disabled" | "onChange" | "value" | "variant">

const FormInput: React.FC<FormInputProps> = ({ name, disabled, colSize, ...rest }) => {
  const { values, errors, onChangeInput, isSubmit, apiFieldErrors } = useContext(FormContext)
  const value = values[name]
  const error = errors[name]
  const isDisabled = disabled ? disabled(values) : undefined
  const apiError = useMemo(() => apiFieldErrors.some((fieldError: string) => fieldError === name), [apiFieldErrors])
  const colSizeProps = colSize ?? {}

  return (
    <Col {...colSizeProps}>
      <Input
        variant="bordered"
        size="lg"
        radius="md"
        value={value}
        isInvalid={!!error || apiError}
        disabled={isDisabled || isSubmit}
        errorMessage={error}
        onChange={onChangeInput}
        name={name}
        {...rest}
      />
    </Col>
  )
}

export default FormInput