import * as Infrastructure from "../../../"


export interface CacheCollection {
	namespace: Infrastructure.CacheCollections

	open( client, name: Infrastructure.CacheCollections ): Promise<void>

	exists( key: string ): Promise<boolean>

	get<T extends Infrastructure.JSONValue>( key: string ): Promise<T>

	getKeysByPattern( pattern: string ): Promise<string[]>

	set<T extends Infrastructure.JSONValue>( key: string, value: T, expire: number ): Promise<void>

	remove( key: string ): Promise<void>

	removeMany( keys: string[] ): Promise<void>
}

export type JSONValue = Array<any> | Object