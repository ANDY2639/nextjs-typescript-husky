import { injectable } from "inversify"
import "reflect-metadata"
import AccessTokenService from "@/domain/services/AccessTokenService"
import { UserState, UserStateSchema } from "@/presentation/redux/features/user/userSlice"

@injectable()
export default class InitialLoadUseCase {
  async startSession(): Promise<UserState> {
    const verifyToken = AccessTokenService.verifyToken()

    if (!verifyToken.isSuccess) {
      throw new Error(verifyToken.error)
    }

    const result = UserStateSchema.safeParse(verifyToken.data)

    if (!result.success) {
      throw new Error(result.error.message)
    }

    return result.data
  }
}