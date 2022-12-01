import * as Inversify      from "inversify"
import * as Infrastructure from "../infrastructure"

import { APIContainerModules } from "../api/dependency-modules"
import { ApplicationsContainerModules } from "../applications/dependency-modules"
import { ComponentsContainerModules }  from "../components/dependency-modules"
import { RepositoriesContainerModules }  from "../repositories/dependency-modules"


export class Dependencies implements Infrastructure.Dependencies {
	private readonly container: Inversify.Container

	constructor() {
		this.container = new Inversify.Container()
	}

	static create(): Dependencies {
		return new Dependencies()
	}

	public async load(): Promise<void> {
		this.container.load(ComponentsContainerModules)
		this.container.load(APIContainerModules)
		this.container.load(ApplicationsContainerModules)
		this.container.load(RepositoriesContainerModules)
	}

	public getItem<T>( symbol: symbol ): T {
		return this.container.get<T>(symbol)
	}
}
