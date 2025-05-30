import * as Yup from "yup";

export type LoginFormValues = {
  username: string;
  password: string;
};

export const loginInitialValues: LoginFormValues = {
  username: "",
  password: "",
};

export const loginFormValidationSchema = Yup.object().shape({
  username: Yup.string().required(""),
  password: Yup.string().required(""),
});
