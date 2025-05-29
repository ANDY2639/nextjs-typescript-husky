import AccessToken from "@/domain/entity/Token/AccessToken"

interface DecodedAccessTokenPayload {
  exp?: number
  [key: string]: unknown
}

export default class AccessTokenService {

  private static readonly tokenKey = "6ef85843-e7ee-4074-bddd-35fea1305ea2"

  static getToken(): AccessToken | null {
    const storageToken = sessionStorage.getItem(this.tokenKey)
    return storageToken ? JSON.parse(storageToken) : null
  }

  static setToken(token: AccessToken): void {
    sessionStorage.setItem(this.tokenKey, JSON.stringify(token))
  }

  static clearToken(): void {
    sessionStorage.removeItem(this.tokenKey)
  }

  static verifyToken(): { isSuccess: boolean, data?: DecodedAccessTokenPayload, error?: string } {
    try {
      // Decodifica el token (nota: esto no verifica la firma)
      const token = this.getToken()
      if (!token) {
        return {
          isSuccess: false,
          error: 'Not Login'
        }
      }
      const [, payload,] = token.accessToken.split('.')
      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString())

      // Verifica si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedPayload.exp && decodedPayload.exp < currentTime) {
        return {
          isSuccess: false,
          error: 'Token has expired'
        }
      }
      return {
        isSuccess: true,
        data: decodedPayload
      }
    } catch {
      return {
        isSuccess: false,
        error: 'Invalid token format'
      }
    }
  }
}