/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from "react"
import FormContext from "../../context/FormContext"
import Col, { ColSizing } from "../../../Layout/Col"
import InputPassword, { InputPasswordProps } from "../../components/InputPassword/InputPassword"


type FormInputPasswordProps = {
  colSize?: ColSizing
  disabled?: (values: {[key: string]: string}) => boolean
  name: string
} & Omit<InputPasswordProps, "error" | "disabled" | "onChange" | "value" | "variant">

const FormPasswordInput: React.FC<FormInputPasswordProps> = ({ name, disabled, colSize, ...rest }) => {
  const { values, errors, onChangeInput, isSubmit, apiFieldErrors } = useContext(FormContext)
  const value = values[name]
  const error = errors[name]
  const isDisabled = disabled ? disabled(values) : undefined
  const apiError = useMemo(() => apiFieldErrors.some(fieldError => fieldError === name), [apiFieldErrors])
  const colSizeProps = colSize ?? {}

  return (
    <Col {...colSizeProps}>
      <InputPassword
        {...rest}
        variant="bordered"
        size="lg"
        radius="md"
        value={value}
        isInvalid={!!error || apiError}
        disabled={isDisabled || isSubmit}
        errorMessage={error}
        onChange={onChangeInput}
        name={name}
      />
    </Col>
  )
}

export default FormPasswordInput
