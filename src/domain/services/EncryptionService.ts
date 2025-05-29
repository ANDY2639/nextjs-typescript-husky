import CryptoJS from "crypto-js"

export default class EncryptionService {
  private static readonly secretKey = process.env.NEXT_PUBLIC_AES_KEY ?? ""
  private static readonly keySize = 256
  private static readonly iterations = 100000
  private static readonly saltSize = 16

  static encryptText(plainText: string): string {
    const salt = CryptoJS.lib.WordArray.random(this.saltSize)

    const key = CryptoJS.PBKDF2(this.secretKey, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations,
      hasher: CryptoJS.algo.SHA256
    })

    const iv = CryptoJS.lib.WordArray.random(16)

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    const combinedArray = salt.concat(iv).concat(encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(combinedArray)
  }

  static decryptText(encryptedBase64: string): string {
    const encryptedArray = CryptoJS.enc.Base64.parse(encryptedBase64)

    const salt = CryptoJS.lib.WordArray.create(encryptedArray.words.slice(0, this.saltSize / 4))
    const iv = CryptoJS.lib.WordArray.create(encryptedArray.words.slice(this.saltSize / 4, this.saltSize / 4 + 4))
    const cipherText = CryptoJS.lib.WordArray.create(encryptedArray.words.slice(this.saltSize / 4 + 4))

    const key = CryptoJS.PBKDF2(this.secretKey, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations,
      hasher: CryptoJS.algo.SHA256
    })

    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: cipherText, salt: salt, iv: iv })

    const decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    )
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}