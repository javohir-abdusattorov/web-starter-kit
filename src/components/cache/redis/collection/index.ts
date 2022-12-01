import { injectable, inject } from "inversify"
import Redis                  from "ioredis"

import * as Infrastructure from "../../../../infrastructure"

import { ComponentsSymbols } from "../../../dependency-symbols"


@injectable()
export class RedisCacheCollectionImpl implements Infrastructure.CacheCollection {
	private connection: Redis
	public namespace: Infrastructure.CacheCollections

	constructor(
		@inject(ComponentsSymbols.Logger) private Logger: Infrastructure.Logger,
		@inject(ComponentsSymbols.Helper) private Helper: Infrastructure.Helper,
	) {
	}

	public async open( client: Redis, name: Infrastructure.CacheCollections ): Promise<void> {
		this.connection = client
		this.namespace = name
	}

	public async exists( key: string ): Promise<boolean> {
		const count = await this.connection.exists(`${ this.namespace }:${ key }`)
		return !!count
	}

	public async get<T extends Infrastructure.JSONValue>( key: string ): Promise<T> {
		const value = await this.connection.get(`${ this.namespace }:${ key }`)
		if (!this.Helper.isValidJsonString(value)) {
			this.Logger.warn(`Getting invalid json from cache: "${value}"`)
			throw new Error(`Getting invalid json from cache: "${value}"`)
		}

		return JSON.parse(value)
	}

	public async getKeysByPattern( pattern: string ): Promise<string[]> {
		return this.connection.keys(`${this.namespace}:${pattern}`)
	}

	public async set<T extends Infrastructure.JSONValue>( key: string, value: T, expire: number ): Promise<void> {
		const string = JSON.stringify(value)
		await this.connection.set(`${ this.namespace }:${ key }`, string, "EX", expire)
	}

	public async remove( key: string ): Promise<void> {
		await this.connection.del(`${ this.namespace }:${ key }`)
	}

	public async removeMany( keys: string[] ): Promise<void> {
		await this.connection.del(keys) // Deleting keys without pasting namespace behind
	}
}