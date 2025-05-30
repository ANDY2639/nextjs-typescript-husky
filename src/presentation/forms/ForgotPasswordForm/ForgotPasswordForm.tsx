import FormInput from "@/presentation/components/CoreUIX/Form/controls/FormInput";
import FormButton from "@/presentation/components/CoreUIX/Form/controls/FormButton";
import FormProvider from "@/presentation/components/CoreUIX/Form/context/FormProvider";
import { forgotPasswordFormValidationSchema, ForgotPasswordFormValues, forgotPasswordInitialValues } from "./ForgotPasswordFormConfig";

type Props = {
  isSubmit: boolean;
  onSubmit: (values: ForgotPasswordFormValues) => void | Promise<void>;
  onResetMfaToken: () => void;
};

const ForgotPasswordForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <FormProvider initialValues={forgotPasswordInitialValues} validationSchema={forgotPasswordFormValidationSchema} onSubmit={onSubmit}>
      <FormInput id="username" name="username" label="Usuario" placeholder="Ingresa tu usuario" colSize={{ xs: 12 }} isRequired />
      <FormButton disabled={(values: ForgotPasswordFormValues) => !values.username}>Restablecer contraseña</FormButton>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
