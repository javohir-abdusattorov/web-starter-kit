export abstract class Dependencies {
	abstract load(): Promise<void>

	abstract getItem<T>( symbol: symbol ): T
}

export type Constructable<T> = () => T