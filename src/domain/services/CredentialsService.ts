import EncryptedUsername from "@/domain/repository/Auth/IEncryptedUsername"
import EncryptedCredentials from "@/domain/repository/Auth/IEncryptedCredentials"
import PasswordChangeCredentials from "@/domain/repository/Auth/IPasswordChangeCredentials"
import EncryptionService from "./EncryptionService"


export default class CredentialsService {
  private static readonly usernameStorageKey = 'bb4ce453-7c05-4975-b89a-6d880b79b6a1'
  private static readonly credentialStorageKey = '52bb5b1e-59e5-481e-b52a-6b346720cfde'
  private static readonly passwordChangeKey = 'bca3435b-8488-4cea-8d1b-2f08ad1d2a5c'

  static encryptCredentials(username: string, password: string): EncryptedCredentials {
    const encryptedCredentials = {
      encryptedUsername: EncryptionService.encryptText(username),
      encryptedPassword: EncryptionService.encryptText(password)
    }

    sessionStorage.setItem(this.credentialStorageKey, JSON.stringify(encryptedCredentials))
    return encryptedCredentials
  }

  static getStoredCredentials(): EncryptedCredentials | null {
    const storedCredentials = sessionStorage.getItem(this.credentialStorageKey)
    return storedCredentials ? JSON.parse(storedCredentials) : null
  }

  static encryptPasswordChangeCredentials(newPassword: string): PasswordChangeCredentials | null {
    const credentials = CredentialsService.getStoredCredentials()
    if (credentials) {
      const passwordChangeCredentials = {
        ...credentials,
        encryptedNewPassword: EncryptionService.encryptText(newPassword)
      }
      sessionStorage.setItem(this.passwordChangeKey, JSON.stringify(passwordChangeCredentials))
      return passwordChangeCredentials
    }
    return null
  }

  static getStoredPasswordChangeCredentials(): PasswordChangeCredentials | null {
    const storedCredentials = sessionStorage.getItem(this.passwordChangeKey);
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  }

  static encryptUsernameCredentials(username: string): EncryptedUsername {
    const encryptedUsername = {
      encryptedUsername: EncryptionService.encryptText(username)
    }

    sessionStorage.setItem(this.usernameStorageKey, JSON.stringify(encryptedUsername))
    return encryptedUsername
  }

  static getStoredUsernameCredentials(): EncryptedUsername | null {
    const storedCredentials = sessionStorage.getItem(this.usernameStorageKey)
    return storedCredentials ? JSON.parse(storedCredentials) : null
  }
}