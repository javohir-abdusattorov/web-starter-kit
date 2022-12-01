export const ComponentsSymbols = {
	Storage: Symbol.for("MongoStorageImpl"),
	Cache: Symbol.for("RedisCacheImpl"),
	CacheCollectionConstructor: Symbol.for("Constructable<RedisCacheCollectionImpl>"),
	CacheCollection: Symbol.for("RedisCacheCollectionImpl"),
	Requester: Symbol.for("RequesterImpl"),
	Logger: Symbol.for("ConsoleLoggerImpl"),
	Helper: Symbol.for("HelperImpl"),
}
