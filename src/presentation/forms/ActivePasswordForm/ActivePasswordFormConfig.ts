import * as Yup from "yup";

export type ActivePasswordFormValues = {
  newPassword: string;
  newPasswordConfirm: string;
};

export const defaultActivePasswordFormValues: ActivePasswordFormValues = {
  newPassword: "",
  newPasswordConfirm: "",
};

export const activePasswordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string(),
  newPasswordConfirm: Yup.string(),
});
