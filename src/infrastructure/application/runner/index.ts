export interface ApplicationRunner {
	initialize(): Promise<void>

	run(): Promise<void>

	stop( incomingSignal: string ): Promise<void>
}