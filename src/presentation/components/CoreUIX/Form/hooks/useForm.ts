/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const useForm = <T>(config: {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validationSchema?: Yup.ObjectSchema<{ [key: string]: any }>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  clearAlert?: () => void;
}): {
  values: T;
  errors: FormikErrors<T>;
  isValid: boolean;
  isSubmitting: boolean;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeField: (name: string, value: string | number | boolean | string[]) => void;
  resetForm: () => void;
  setValues: (values: T) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitForm: () => void;
  clearError: (name: string | string[]) => void;
  dirty: boolean;
} => {
  const { values, errors, isValid, isSubmitting, setErrors, handleChange, handleSubmit, setFieldValue, resetForm, setValues, submitForm, dirty } =
    useFormik({
      onSubmit: config.onSubmit,
      initialValues: config.initialValues as any,
      validateOnBlur: config.validateOnBlur,
      validateOnChange: config.validateOnChange,
      validationSchema: config.validationSchema,
    });

  const clearError = (data: string | string[]) => {
    if (typeof data === "string") {
      const updatedErrors = { ...errors };
      delete updatedErrors[data];
      setErrors(updatedErrors);
      if (config.clearAlert) {
        config.clearAlert();
      }
    } else {
      const updatedErrors = { ...errors };
      data.forEach((name) => {
        delete updatedErrors[name];
      });
      setErrors(updatedErrors);
      if (config.clearAlert) {
        config.clearAlert();
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setFieldValue(e.target.name, e.target.checked);
    } else {
      handleChange(e);
    }
    clearError(e.target.name);
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
    clearError(e.target.name);
  };

  const onChangeField = (name: string, value: any) => {
    handleValues(name, value);
    clearError(name);
  };

  const handleValues = (name: string, value: any) => setFieldValue(name, value);

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    onChangeField,
    onChangeTextArea,
    onChangeInput,
    resetForm,
    setValues,
    onSubmit: handleSubmit,
    submitForm,
    clearError,
    dirty,
  };
};

export default useForm;
