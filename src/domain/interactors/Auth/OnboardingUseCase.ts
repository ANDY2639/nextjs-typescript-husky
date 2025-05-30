import { injectable, inject } from "inversify";
import type IAuthRepository from "@/domain/repository/Auth/IAuthRepository";
import AccessToken from "@/domain/entity/Token/AccessToken";
import MfaToken from "@/domain/entity/Token/MfaToken";
import MfaTokenService from "@/domain/services/MfaTokenService";
import AccessTokenService from "@/domain/services/AccessTokenService";
import CredentialsService from "@/domain/services/CredentialsService";
import RepositoryTypes from "@/domain/entity/Types/RepositoryTypes";

@injectable()
export default class OnboardingUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(@inject(RepositoryTypes.AuthRepository) authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  private getLocalMfaToken(): MfaToken {
    const mfaToken = MfaTokenService.getToken();
    if (mfaToken) {
      return mfaToken;
    }
    throw new Error("MfaToken not found");
  }

  async requestLoginOtp(username: string, password: string): Promise<MfaToken> {
    const { encryptedUsername, encryptedPassword } = CredentialsService.encryptCredentials(username, password);

    const result = await this.authRepository.requestLoginOtp(encryptedUsername, encryptedPassword);

    MfaTokenService.setToken(result);
    return result;
  }

  async verifyLoginOtp(mfaCode: string): Promise<AccessToken> {
    const mfaToken = this.getLocalMfaToken();
    const storedCredentials = CredentialsService.getStoredCredentials();
    if (!storedCredentials) {
      throw new Error("Forbidden");
    }
    const { encryptedUsername, encryptedPassword } = storedCredentials;

    const response = await this.authRepository.verifyLoginOtp(encryptedUsername, encryptedPassword, mfaToken.mfaToken, mfaCode);

    AccessTokenService.setToken(response);

    return response;
  }

  async requestPasswordResetOtp(newPassword: string): Promise<MfaToken> {
    const storedCredentials = CredentialsService.encryptPasswordChangeCredentials(newPassword);
    if (!storedCredentials) {
      throw new Error("Forbidden");
    }
    const { encryptedUsername, encryptedPassword, encryptedNewPassword } = storedCredentials;

    const result = await this.authRepository.requestPasswordResetOtp(encryptedUsername, encryptedPassword, encryptedNewPassword);

    MfaTokenService.setToken(result);

    return result;
  }

  async verifyResetPasswordOtp(mfaCode: string): Promise<AccessToken> {
    const mfaToken = this.getLocalMfaToken();
    const storedCredentials = CredentialsService.getStoredPasswordChangeCredentials();
    if (!storedCredentials) {
      throw new Error("Forbidden");
    }
    const { encryptedUsername, encryptedPassword, encryptedNewPassword } = storedCredentials;

    const response = await this.authRepository.verifyResetPasswordOtp(
      encryptedUsername,
      encryptedPassword,
      encryptedNewPassword,
      mfaToken.mfaToken,
      mfaCode,
    );

    AccessTokenService.setToken(response);

    return response;
  }

  async sendRecoveryPasswordEmail(username: string): Promise<MfaToken> {
    const { encryptedUsername } = CredentialsService.encryptUsernameCredentials(username);

    const result = await this.authRepository.sendRecoveryPasswordEmail(encryptedUsername);

    MfaTokenService.setToken(result);
    return result;
  }

  async resendLoginOtp(mfaCode: string): Promise<boolean> {
    const mfaToken = this.getLocalMfaToken();
    const storedCredentials = CredentialsService.getStoredUsernameCredentials();
    if (!storedCredentials) {
      throw new Error("Forbidden");
    }
    const { encryptedUsername } = storedCredentials;

    const response = await this.authRepository.resendLoginOtp(encryptedUsername, mfaToken.mfaToken, mfaCode);

    return response;
  }
}
