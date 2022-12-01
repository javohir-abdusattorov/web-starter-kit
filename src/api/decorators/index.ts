import { inject, injectable } from "inversify"

import * as Infrastructure from "../../infrastructure"
import * as Controllers    from "../controllers"
import * as Interfaces     from "../interfaces"

import { Config }          from "../../config"
import { APISymbols }      from "../dependency-symbols"
import { ServicesSymbols } from "../../services/dependency-symbols"


@injectable()
export class APIDecorators {
	constructor(
		@inject(ServicesSymbols.AuthorizationService) private AuthorizationService: Infrastructure.AuthorizationService,
	) {
	}

	public addAuthorization( server: Infrastructure.API ): void {
		const self = this

		server.decorate("authenticate", async (req: Infrastructure.APIRequest, res: Infrastructure.APIResponse): Promise<Infrastructure.APIResponse> => {
			const token = req.headers[Config.authorization.token.header].toString()
			if (!token) {
				return res.code(401).send(`Authentication error: token not sent`)
			}

			const result = await self.AuthorizationService.verifyToken(token)
			if (!result) {
				return res.code(401).send(`Authentication error: cannot verify token`)
			}

			return
		})
	}

}