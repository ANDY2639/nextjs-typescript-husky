import { injectable } from "inversify";
import IAuthRepository from "@/domain/repository/Auth/IAuthRepository";
import AccessToken from "@/domain/entity/Token/AccessToken";
import ax from "@/data/provider/axiosClient";
import MfaToken from "@/domain/entity/Token/MfaToken";
import RepositoryBase from "../RepositoryBase";
import "reflect-metadata";

@injectable()
export default class AuthRepository extends RepositoryBase implements IAuthRepository {
  async requestLoginOtp(username: string, password: string): Promise<MfaToken> {
    const payload = {
      grantType: "password",
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      username,
      password,
    };

    const { data } = await ax.post(`${this.autenticationPrefix}/manager/login/otp`, payload);
    return {
      mfaToken: data.mfaToken,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
  }

  async verifyLoginOtp(username: string, password: string, mfaToken: string, mfaCode: string): Promise<AccessToken> {
    const payload = {
      grantType: "password",
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      username,
      password,
      mfaToken,
      mfaCode,
    };

    const { data } = await ax.post(`${this.autenticationPrefix}/manager/login`, payload);
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      refreshExpiresIn: data.refresh_expires_in,
    };
  }

  async requestPasswordResetOtp(username: string, oldPassword: string, newPassword: string): Promise<MfaToken> {
    const payload = {
      username,
      oldPassword,
      newPassword,
    };
    const { data } = await ax.post(`${this.autenticationPrefix}/manager/reset-password/otp`, payload);
    return {
      mfaToken: data.mfaToken,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
  }

  async verifyResetPasswordOtp(username: string, oldPassword: string, newPassword: string, mfaToken: string, mfaCode: string): Promise<AccessToken> {
    const payload = {
      username,
      oldPassword,
      newPassword,
      mfaCode,
      mfaToken,
    };

    const { data } = await ax.post(`${this.autenticationPrefix}/manager/reset-password`, payload);
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      refreshExpiresIn: data.refresh_expires_in,
    };
  }

  async sendRecoveryPasswordEmail(username: string): Promise<MfaToken> {
    const payload = {
      username,
    };

    const { data } = await ax.post(`${this.autenticationPrefix}/manager/forgot-password/otp`, payload);

    return {
      mfaToken: data.mfaToken,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
  }

  async resendLoginOtp(username: string, mfaToken: string, mfaCode: string): Promise<boolean> {
    const payload = {
      username,
      mfaCode,
      mfaToken,
    };

    const { data } = await ax.post(`${this.autenticationPrefix}/manager/forgot-password/otp-validate`, payload);

    return data;
  }
}
