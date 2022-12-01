import { ContainerModule, interfaces } from "inversify"
import { ApplicationsSymbols }         from "./dependency-symbols"

import * as Applications   from "./"


const ApplicationsContainerModules = new ContainerModule(( bind: interfaces.Bind ) => {
	bind<Applications.MainAPIApplication>(ApplicationsSymbols.MainAPIApplication)
		.to(Applications.MainAPIApplication)
		.inSingletonScope()
})

export {
	ApplicationsContainerModules,
}
