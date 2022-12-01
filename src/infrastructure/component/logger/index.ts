export interface Logger {
	log( ...args: LoggerParameter[] ): void | Promise<void>

	success( ...args: LoggerParameter[] ): void | Promise<void>

	error( ...args: LoggerParameter[] ): void | Promise<void>

	warn( ...args: LoggerParameter[] ): void | Promise<void>

	info( ...args: LoggerParameter[] ): void | Promise<void>
}

export type LoggerParameter = string | Object | Array<any>