import AccessToken from "@/domain/entity/Token/AccessToken";
import MfaToken from "@/domain/entity/Token/MfaToken";

export default interface IAuthRepository {
  requestLoginOtp(userIdentifier: string, password: string): Promise<MfaToken>;
  verifyLoginOtp(userIdentifier: string, password: string, mfaToken: string, mfaCode: string): Promise<AccessToken>;
  requestPasswordResetOtp(userIdentifier: string, oldPassword: string, newPassword: string): Promise<MfaToken>;
  verifyResetPasswordOtp(userIdentifier: string, oldPassword: string, newPassword: string, mfaToken: string, mfaCode: string): Promise<AccessToken>;
  sendRecoveryPasswordEmail(userIdentifier: string): Promise<MfaToken>;
  resendLoginOtp(username: string, mfaToken: string, mfaCode: string): Promise<boolean>;
}
