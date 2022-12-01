import { ContainerModule, interfaces } from "inversify"
import { ServicesSymbols }             from "./dependency-symbols"

import * as Infrastructure from "../infrastructure"
import * as Services       from "./"


const ServicesContainerModules = new ContainerModule(( bind: interfaces.Bind ) => {
	bind<Infrastructure.AuthorizationService>(ServicesSymbols.AuthorizationService)
		.to(Services.AuthorizationServiceImpl)
		.inSingletonScope()
})

export {
	ServicesContainerModules,
}
