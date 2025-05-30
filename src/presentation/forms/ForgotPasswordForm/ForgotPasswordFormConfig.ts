import * as Yup from "yup";

export type ForgotPasswordFormValues = {
  username: string;
};

export const forgotPasswordInitialValues: ForgotPasswordFormValues = {
  username: "",
};

export const forgotPasswordFormValidationSchema = Yup.object().shape({
  username: Yup.string().required(""),
});
