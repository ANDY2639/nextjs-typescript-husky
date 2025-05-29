export enum OnboardingSteps {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  LOGIN_FORGOT = 'LOGIN_FORGOT',
}

export type TitleAndSubtitle = {
  title: string;
  subtitle: string;
}

export const displayTexts: Record<OnboardingSteps, TitleAndSubtitle> = {
  [OnboardingSteps.LOGIN]: {
    title: 'Iniciar sesión',
    subtitle: 'Ingresa tus datos para continuar',
  },
  [OnboardingSteps.REGISTER]: {
    title: 'Nueva contraseña',
    subtitle: 'Ingresa una nueva contraseña para acceder a "nombre del DS"',
  },
  [OnboardingSteps.FORGOT_PASSWORD]: {
    title: 'Para continuar',
    subtitle: 'Ingresa el usuario vinculado a tu cuenta para restablecer tu contraseña.',
  },
  [OnboardingSteps.LOGIN_FORGOT]: {
    title: 'Restablecer Contraseña',
    subtitle: 'Ingresa tu usuario y la contraseña enviada a tu correo registrado',
  }
}