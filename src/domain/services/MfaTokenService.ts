import MfaToken from "@/domain/entity/Token/MfaToken"

export default class MfaTokenService {

  private static readonly tokenKey = "4a715c89-2b4a-4b32-8f05-d27419d3e783"

  static getToken(): MfaToken | null {
    const storageToken = sessionStorage.getItem(this.tokenKey)
    return storageToken ? JSON.parse(storageToken) : null
  }

  static setToken(token: MfaToken): void {
    sessionStorage.setItem(this.tokenKey, JSON.stringify(token))
  }

  static clearToken(): void {
    sessionStorage.removeItem(this.tokenKey)
  }
}