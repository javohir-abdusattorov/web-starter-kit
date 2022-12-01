import { inject, injectable } from "inversify"

import * as Infrastructure from "../../infrastructure"
import * as Controllers    from "../controllers"
import * as Interfaces     from "../interfaces"

import { APISymbols } from "../dependency-symbols"


@injectable()
export class APIRegister {
	constructor(
		@inject(APISymbols.UserController) private UserController: Controllers.UserController,
	) {
	}

	public async execute( api: Infrastructure.API ): Promise<void> {
		// User
		api.route({
			method: Interfaces.UserInterfaces.GetAll.Method,
			url: Interfaces.UserInterfaces.GetAll.Url,
			schema: Interfaces.UserInterfaces.GetAll.Validation,
			handler: this.UserController.getAll.bind(this.UserController),
		})
	}
}