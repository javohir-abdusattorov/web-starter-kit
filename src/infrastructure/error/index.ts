export class Error {
	constructor(
		public message: string,
		public code: number,
		public data: any = null,
	) {
	}

	public print(): {
		message: string
		code: number
		data: any
	} {
		return {
			message: this.message,
			code: this.code,
			data: this.data,
		}
	}
}

export enum ErrorCodes {
	Unauthorized = -32504,
	UserNotRegistered = -32000,
	UserAlreadyRegistered = -32001,
	IncorrectPassword = -32002,
	NotFound = -32004,
	PositionMismatch = -32005,
	SystemError = -32099,
}