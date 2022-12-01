import { inject, injectable } from "inversify"

import * as Entities       from "../../entities"
import * as Infrastructure from "../../infrastructure"
import * as Repositories   from "../../repositories"

import { RepositoriesSymbols } from "../dependency-symbols"
import { ComponentsSymbols }   from "../../components/dependency-symbols"


@injectable()
export class UserRepository {
	constructor(
		@inject(ComponentsSymbols.Storage) private Storage: Infrastructure.Storage,
	) {
	}

	public async find(): Promise<Entities.User[]> {
		const storageDocuments = await this.Storage.getUsers().find<OnStorageDocument>({}).toArray()

		return this.manyToEntity(storageDocuments)
	}

	public async findById( id: Entities.Identifier ): Promise<Entities.User> {
		const storageDocument = await this.Storage.getUsers().findOne<OnStorageDocument>({
			_id: id.toStorageValue()
		})

		return this.toEntity(storageDocument)
	}


	private async manyToEntity( storageDocuments: OnStorageDocument[] ): Promise<Entities.User[]> {
		if (!storageDocuments.length) return []

		const result: Entities.User[] = []
		for (const document of storageDocuments) {
			const entity = await this.toEntity(document)
			result.push(entity)
		}
		return result
	}

	private async toEntity( storageDocument: OnStorageDocument ): Promise<Entities.User> {
		if (!storageDocument) return null

		return {
			id: new Entities.Identifier(storageDocument._id),
			name: storageDocument.name,
			phone: storageDocument.phone
		}
	}
}

interface OnStorageDocument {
	_id: Entities.OnStorageValue
	name: string
	phone: string
}