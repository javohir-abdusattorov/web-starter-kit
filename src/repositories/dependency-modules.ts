import { ContainerModule, interfaces } from "inversify"
import { RepositoriesSymbols }         from "./dependency-symbols"

import * as Repositories from "./"


const RepositoriesContainerModules = new ContainerModule(( bind: interfaces.Bind ) => {
	bind<Repositories.UserRepository>(RepositoriesSymbols.UserRepository)
		.to(Repositories.UserRepository)
		.inSingletonScope()
})

export {
	RepositoriesContainerModules,
}
