import EncryptedUsername from "./IEncryptedUsername";

export default interface EncryptedCredentials extends EncryptedUsername {
  encryptedPassword: string;
}

