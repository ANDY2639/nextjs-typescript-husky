import FormInput from "@/presentation/components/CoreUIX/Form/controls/FormInput";
import FormButton from "@/presentation/components/CoreUIX/Form/controls/FormButton";
import FormProvider from "@/presentation/components/CoreUIX/Form/context/FormProvider";
import FormPasswordInput from "@/presentation/components/CoreUIX/Form/controls/FormInputPassword";
import { loginFormValidationSchema, LoginFormValues, loginInitialValues } from "./LoginFormConfig";

type Props = {
  flow: string;
  isSubmit: boolean;
  onForgotPassword: () => void;
  onSubmit: (values: LoginFormValues) => void;
};

const LoginForm: React.FC<Props> = ({ flow, isSubmit, onSubmit, onForgotPassword }) => {
  const labelTemp = flow === "forgot" ? "temporal" : "";

  return (
    <FormProvider initialValues={loginInitialValues} validationSchema={loginFormValidationSchema} onSubmit={onSubmit}>
      <FormInput
        id="username"
        name="username"
        label="Usuario"
        placeholder="Ingresa tu usuario"
        colSize={{ xs: 12 }}
        isDisabled={isSubmit}
        isRequired
      />
      <FormPasswordInput
        id="password"
        name="password"
        label={`Contraseña ${labelTemp}`}
        placeholder={`Ingresa tu contraseña ${labelTemp}`}
        colSize={{ xs: 12 }}
        isDisabled={isSubmit}
        isRequired
        helpText={{
          content: "¿Olvidaste tu contraseña?",
          onClick: onForgotPassword,
        }}
      />
      <FormButton isLoading={isSubmit} disabled={(values: LoginFormValues) => !values.username || !values.password}>
        Ingresar
      </FormButton>
    </FormProvider>
  );
};

export default LoginForm;
