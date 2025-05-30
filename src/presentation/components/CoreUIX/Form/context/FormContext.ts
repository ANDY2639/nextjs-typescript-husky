/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export type FormContextValues = {
  values: any;
  errors: any;
  apiFieldErrors: string[];
  isSubmit: boolean;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeField: (name: string, value: string | number | boolean | string[]) => void;
  setPartialValues: (values: Record<string, string | number | boolean | string[]>) => void;
  isDisabledSubmit: boolean;
  setIsDisabledSubmit: (isDisabledSubmit: boolean) => void;
  clearError: (name: string | string[]) => void;
};

const FormContext = createContext<FormContextValues>({
  values: {},
  errors: {},
  isSubmit: false,
  onChangeField: () => {},
  onChangeInput: () => {},
  onChangeTextArea: () => {},
  apiFieldErrors: [],
  isDisabledSubmit: false,
  setIsDisabledSubmit: () => {},
  setPartialValues: () => {},
  clearError: () => {},
});

export default FormContext;
