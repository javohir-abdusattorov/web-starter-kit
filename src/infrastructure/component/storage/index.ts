import * as Mongodb from "mongodb"


export interface Storage {
	open(): Promise<void>

	close(): Promise<void>

	getUsers(): Mongodb.Collection
}