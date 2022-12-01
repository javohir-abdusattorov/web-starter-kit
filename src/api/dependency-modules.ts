import { ContainerModule, interfaces } from "inversify"
import { APISymbols }                  from "./dependency-symbols"

import * as API from "./"


const APIContainerModules = new ContainerModule(( bind: interfaces.Bind ) => {
	bind<API.APIServer>(APISymbols.Server)
		.to(API.APIServer)

	bind<API.APIRegister>(APISymbols.Register)
		.to(API.APIRegister)


	// Controllers
	bind<API.UserController>(APISymbols.UserController)
		.to(API.UserController)
		.inSingletonScope()
})

export {
	APIContainerModules,
}
