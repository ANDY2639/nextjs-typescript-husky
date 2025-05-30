import EncryptedCredentials from "./IEncryptedCredentials";

export default interface PasswordChangeCredentials extends EncryptedCredentials {
  encryptedNewPassword: string;
}
