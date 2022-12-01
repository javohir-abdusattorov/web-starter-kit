import { injectable, inject } from "inversify"
import * as JWT               from "jsonwebtoken"

import * as Infrastructure from "../../infrastructure"
import * as Entities       from "../../entities"

import { Config }            from "../../config"
import { ComponentsSymbols } from "../../components/dependency-symbols"


@injectable()
export class AuthorizationServiceImpl implements Infrastructure.AuthorizationService {
	constructor(
		@inject(ComponentsSymbols.Logger) private Logger: Infrastructure.Logger,
	) {
	}


	public async verifyToken( token: string ): Promise<Infrastructure.AuthorizationPayload> {
		try {
			const payload = await JWT.verify(
				token,
				Config.authorization.token.secret,
			) as Infrastructure.AuthorizationPayload

			console.log(`Payload:`, payload)
			return payload
		}
		catch (error) {
			return null
		}
	}

	public async createToken( user: Entities.User ): Promise<string> {
		const payload: Infrastructure.AuthorizationPayload = { id: user.id.toString(), username: user.name }
		try {
			const token = await JWT.sign(
				payload,
				Config.authorization.token.secret,
			)
			console.log(`Token:`, token)

			return token
		}
		catch (error) {
			this.Logger.error(`Error at signing JWT token:`, error)
		}
	}
}