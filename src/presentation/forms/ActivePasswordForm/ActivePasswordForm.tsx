import FormButton from "@/presentation/components/CoreUIX/Form/controls/FormButton"
import FormProvider from "@/presentation/components/CoreUIX/Form/context/FormProvider"
import FormPasswordInput from "@/presentation/components/CoreUIX/Form/controls/FormInputPassword"
import PasswordStrengthMeter from "@/presentation/components/CoreUIX/Form/components/PasswordStrengthMeter"
import { activePasswordFormValidationSchema, ActivePasswordFormValues, defaultActivePasswordFormValues } from "./ActivePasswordFormConfig"

type Props = {
  isSubmit: boolean
  onSubmit: (values: ActivePasswordFormValues) => void
}

const ActivePasswordForm: React.FC<Props> = ({ isSubmit, onSubmit }) => {
  return (
    <FormProvider
      initialValues={defaultActivePasswordFormValues}
      onSubmit={onSubmit}
      validationSchema={activePasswordFormValidationSchema}
    >
      <FormPasswordInput
        id="newPassword"
        name="newPassword"
        label="Define tu contraseña"
        placeholder="Ingresa tu contraseña"
        colSize={{ xs: 12 }}
        isDisabled={isSubmit}
        isRequired
      />
      <FormPasswordInput
        id="newPasswordConfirm"
        name="newPasswordConfirm"
        label="Confirma tu contraseña"
        placeholder="Confirma tu contraseña"
        colSize={{ xs: 12 }}
        isDisabled={isSubmit}
        isRequired
      />
      <PasswordStrengthMeter />
      <FormButton
        isLoading={isSubmit}
        disabled={(values: ActivePasswordFormValues) => {
          return !values.newPassword || !values.newPasswordConfirm || values.newPassword !== values.newPasswordConfirm
        }}
      >
        Ingresar
      </FormButton>
    </FormProvider>
  )
}

export default ActivePasswordForm
