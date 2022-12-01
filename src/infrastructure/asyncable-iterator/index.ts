export class AsyncableIterator<Type> implements AsyncIterableIterator<Type> {
	private readonly _next: Next<Type>

	constructor( next: Next<Type> ) {
		this._next = next
	}

	[Symbol.asyncIterator](): AsyncIterableIterator<Type> {
		return this
	}

	public async next( value?: any ): Promise<IteratorResult<Type>> {
		return await this._next(value)
	}
}

export type Next<Type> = ( value?: any ) => Promise<IteratorResult<Type>>