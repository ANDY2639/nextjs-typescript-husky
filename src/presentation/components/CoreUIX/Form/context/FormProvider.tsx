"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { ReactNode, useImperativeHandle, useMemo, useState } from "react";
import * as Yup from "yup";
import { Form } from "@heroui/form";
import useForm from "@/presentation/components/CoreUIX/Form/hooks/useForm";
import FormContext from "@/presentation/components/CoreUIX/Form/context/FormContext";
import Row from "@/presentation/components/CoreUIX/Layout/Row";

export type FormProviderMethods<T> = {
  resetForm: () => void;
  setValues: (values: T) => void;
  submitForm: () => void;
};

type FormProviderProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  children: ReactNode;
  validationSchema?: Yup.ObjectSchema<any>;
  apiFieldErrors?: string[];
  isDisabledForm?: boolean;
  data?: { [key: string]: string | string[] | number | boolean };
  validOnChange?: boolean;
  onReset?: boolean;
  formRef?: React.RefObject<FormProviderMethods<T>>;
  clearAlert?: () => void;
};

const FormProvider = <T extends unknown>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  apiFieldErrors,
  isDisabledForm,
  data,
  validOnChange,
  onReset,
  formRef,
  clearAlert,
}: FormProviderProps<T>) => {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);

  const {
    values,
    errors,
    isSubmitting,
    onSubmit: handleSubmit,
    onChangeInput,
    onChangeField,
    onChangeTextArea,
    resetForm,
    setValues,
    submitForm,
    clearError,
  } = useForm({
    initialValues,
    onSubmit: (values) => onSubmit(values),
    validateOnBlur: true,
    validateOnChange: validOnChange,
    validationSchema,
    clearAlert,
  });

  useMemo(() => {
    if (data) {
      const key = Object.keys(data)[0];
      const value = data[key];
      onChangeField(key, value);
    }
  }, [data]);

  useMemo(() => {
    if (onReset) {
      resetForm();
    }
  }, [onReset]);

  useImperativeHandle(formRef, () => ({
    resetForm,
    setValues,
    submitForm,
  }));

  const setPartialValues = (partialValues: Record<string, any>) => {
    setValues({
      ...(values as any),
      ...partialValues,
    });
  };

  const handleSubmitForm =
    isDisabledForm || isDisabledSubmit
      ? (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }
      : handleSubmit;

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        isSubmit: isSubmitting,
        onChangeInput,
        onChangeField,
        onChangeTextArea,
        apiFieldErrors: apiFieldErrors || [],
        isDisabledSubmit,
        setIsDisabledSubmit,
        setPartialValues,
        clearError,
      }}
    >
      <Form onSubmit={handleSubmitForm} className="w-full">
        <Row>{children}</Row>
      </Form>
    </FormContext.Provider>
  );
};

export default FormProvider;
