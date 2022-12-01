export interface Application {
	start(): Promise<void>

	stop(): Promise<void>
}