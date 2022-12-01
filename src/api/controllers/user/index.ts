import { inject, injectable } from "inversify"

import * as Repositories from "../../../repositories"

import { UserInterfaces as Interfaces } from "../../interfaces"
import { RepositoriesSymbols }          from "../../../repositories/dependency-symbols"


@injectable()
export class UserController {
	constructor(
		@inject(RepositoriesSymbols.UserRepository) private UserRepository: Repositories.UserRepository
	) {
	}

	public async getAll( req: Interfaces.GetAll.Request ): Promise<Interfaces.GetAll.Response> {
		const users = await this.UserRepository.find()
		return { documents: users }
	}
}