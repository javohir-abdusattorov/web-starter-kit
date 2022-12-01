import { ContainerModule, interfaces } from "inversify"
import { ComponentsSymbols } from "./dependency-symbols"

import * as Infrastructure from "../infrastructure"
import * as Components from "./"


const ComponentsContainerModules = new ContainerModule(( bind: interfaces.Bind ) => {
	bind<Infrastructure.Storage>(ComponentsSymbols.Storage)
		.to(Components.MongoStorageImpl)
		.inSingletonScope()

	bind<Infrastructure.Cache>(ComponentsSymbols.Cache)
		.to(Components.RedisCacheImpl)
		.inSingletonScope()

	bind<Infrastructure.CacheCollection>(ComponentsSymbols.CacheCollection)
		.to(Components.RedisCacheCollectionImpl)

	bind<interfaces.Factory<Infrastructure.CacheCollection>>(ComponentsSymbols.CacheCollectionConstructor)
		.toFactory<Infrastructure.CacheCollection>((context: interfaces.Context) => {
			return () => {
				return context.container.get<Infrastructure.CacheCollection>(ComponentsSymbols.CacheCollection)
			}
		})

	bind<Infrastructure.Requester>(ComponentsSymbols.Requester)
		.to(Components.RequesterImpl)
		.inSingletonScope()

	bind<Infrastructure.Logger>(ComponentsSymbols.Logger)
		.to(Components.ConsoleLoggerImpl)
		.inSingletonScope()

	bind<Infrastructure.Helper>(ComponentsSymbols.Helper)
		.to(Components.HelperImpl)
		.inSingletonScope()
})

export {
	ComponentsContainerModules
}
