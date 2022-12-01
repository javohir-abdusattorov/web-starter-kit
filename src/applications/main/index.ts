import { inject, injectable } from "inversify"

import * as Infrastructure from "../../infrastructure"
import * as API            from "../../api"

import { APISymbols } from "../../api/dependency-symbols"


@injectable()
export class MainAPIApplication implements Infrastructure.Application {
	constructor(
		@inject(APISymbols.Server) private APIServer: API.APIServer,
	) {
	}

	public async start(): Promise<void> {
		try {
			await this.APIServer.initialize()
			await this.APIServer.start()
		}
		catch (error) {
			console.log(error)
			await this.APIServer.stop()
		}
	}

	public async stop(): Promise<void> {
		await this.APIServer.stop()
	}
}