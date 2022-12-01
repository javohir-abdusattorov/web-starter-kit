import { ObjectId } from "mongodb"


export class Identifier {
	private readonly _string_value: string
	private readonly _storage_value: OnStorageValue
	private readonly _isNew: boolean = false

	constructor( id?: ID ) {
		if (!id) {
			const newId = new ObjectId()

			this._string_value = newId.toHexString()
			this._storage_value = newId
			this._isNew = true
		}

		else if (typeof (id) === "string") {
			this._string_value = id
			this._storage_value = new ObjectId(id)
		}

		else {
			this._string_value = id.toHexString()
			this._storage_value = id
		}

		return this
	}

	public toString(): string {
		return this._string_value
	}

	public toStorageValue(): OnStorageValue {
		return this._storage_value
	}

	public isNew(): boolean {
		return this._isNew
	}

	public isEqualTo( id: Identifier ): boolean {
		return this.toStorageValue().equals(id.toStorageValue())
	}
}


export type OnStorageValue = ObjectId

export type ID = string | OnStorageValue