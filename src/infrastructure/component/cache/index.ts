import * as Infrastructure from "../../"


export interface Cache {
	open(): Promise<void>

	close(): Promise<void>

	getCollection( name: Infrastructure.CacheCollections ): Infrastructure.CacheCollection
}