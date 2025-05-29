import { Container } from "inversify"
import UseCaseTypes from "@/domain/entity/Types/UseCaseTypes"
import RepositoryTypes from "@/domain/entity/Types/RepositoryTypes"
import AuthRepository from "@/data/Repository/Auth/AuthRepository"
import IAuthRepository from "@/domain/repository/Auth/IAuthRepository"
import OnboardingUseCase from "@/domain/interactors/Auth/OnboardingUseCase"
import InitialLoadUseCase from "@/domain/interactors/InitialLoad/InitialLoadUseCase"

const container = new Container()

// repositories
container.bind<IAuthRepository>(RepositoryTypes.AuthRepository).to(AuthRepository)


// use cases
container.bind<OnboardingUseCase>(UseCaseTypes.OnboardingUseCase).to(OnboardingUseCase)
container.bind<InitialLoadUseCase>(UseCaseTypes.InitialLoadUseCase).to(InitialLoadUseCase)


export default container