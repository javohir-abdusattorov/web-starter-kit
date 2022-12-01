import { injectable, inject } from "inversify"
import Redis                              from "ioredis"

import * as Infrastructure from "../../../infrastructure"

import { Config } from "../../../config"
import { ComponentsSymbols } from "../../dependency-symbols"


@injectable()
export class RedisCacheImpl implements Infrastructure.Cache {
	private connection: Redis
	private collections: Infrastructure.CacheCollection[] = []

	constructor(
		@inject(ComponentsSymbols.Logger) private Logger: Infrastructure.Logger,
		@inject(ComponentsSymbols.Helper) private Helper: Infrastructure.Helper,
		@inject(ComponentsSymbols.CacheCollectionConstructor) private CollectionConstructor: Infrastructure.Constructable<Infrastructure.CacheCollection>,
	) {
	}

	public async open(): Promise<void> {
		try {
			this.connection = new Redis(
				Config.redis.port,
				Config.redis.host,
				{
					db: Config.redis.database,
					maxRetriesPerRequest: 1,
					retryStrategy: this.retry.bind(this)
				},
			)

			for (const collectionName of Config.redis.collections) {
				const impl = this.CollectionConstructor()
				await impl.open(this.connection, collectionName as unknown as Infrastructure.CacheCollections)
				this.collections.push(impl)
			}

			await (new Promise(done => setTimeout(done, 2000)))
			this.Logger.info(`Redis cache connected`)
		} catch (error) {
			this.Logger.error(`Redis cache connection failed:`, error)
			throw error
		}
	}

	public async close(): Promise<void> {
		if (this.connection) await this.connection.quit()

		this.Logger.warn(`Redis cache disconnected`)
	}

	private retry( count: number ): number {
		if (count > 3) {
			this.Logger.error(`Redis cache connection failed, after 3 retries`)
			throw Error("Redis cache connection failed")
		}

		return Math.min(count * 100, 2000)
	}

	public getCollection( name: Infrastructure.CacheCollections ): Infrastructure.CacheCollection {
		return this.collections.find((collection) => collection.namespace === name)
	}
}