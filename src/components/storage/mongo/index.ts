import { injectable, inject } from "inversify"

import * as Mongodb from "mongodb"
import * as Infrastructure    from "../../../infrastructure"

import { Config }            from "../../../config"
import { ComponentsSymbols } from "../../dependency-symbols"


@injectable()
export class MongoStorageImpl implements Infrastructure.Storage {
	private connection: Mongodb.MongoClient
	private db: Mongodb.Db

	constructor(
		@inject(ComponentsSymbols.Logger) private Logger: Infrastructure.Logger,
	) {
	}

	public async open(): Promise<void> {
		try {
			const url = `mongodb://${Config.database.host}:${Config.database.port}`
			this.connection = new Mongodb.MongoClient(url, {
				maxPoolSize: 50,
				minPoolSize: 10,
			})
			await this.connection.connect()

			this.db = this.connection.db(Config.database.name)

			this.Logger.info(`Mongo storage connected`)
		} catch (error) {
			this.Logger.error(`Mongo storage connection failed:`, error)
			throw error
		}
	}

	public async close(): Promise<void> {
		await this.connection.close()
		this.Logger.warn(`Mongo storage disconnected`)
	}

	public getUsers(): Mongodb.Collection {
		return this.db.collection("user")
	}
}
