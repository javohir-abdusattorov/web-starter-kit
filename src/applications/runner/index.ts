import * as Infrastructure   from "../../infrastructure"
import * as Dependencies     from "../../dependency"

import { ComponentsSymbols } from "../../components/dependency-symbols"


export class ApplicationRunnerImpl implements Infrastructure.ApplicationRunner {
	private readonly name: string

	constructor(
		private Dependencies: Dependencies.Dependencies,
		private applicationSymbol: symbol,
	) {
		this.name = applicationSymbol.description
		process.on("SIGINT", this.stop.bind(this, "SIGINT"))
		process.on("SIGTERM", this.stop.bind(this, "SIGTERM"))
		process.on("unhandledRejection", this.onUnhandledRejection.bind(this))
	}

	public static create( dependencies: Dependencies.Dependencies, symbol: symbol ): Infrastructure.ApplicationRunner {
		return new ApplicationRunnerImpl(dependencies, symbol)
	}

	public async initialize(): Promise<void> {
		await this.Dependencies.load()
		await this.initializeComponents()
	}

	public async run(): Promise<void> {
		console.log(`[${ this.name }] Application runner started`)

		try {
			await this.initialize()
		}
		catch (error) {
			console.log(`[${ this.name }] Application initialization: `, error)
		}

		try {
			const application = this.Dependencies.getItem<Infrastructure.Application>(this.applicationSymbol)

			if (application) {
				await application.start()
			}
			else {
				console.warn(`[${ this.name }] Application is not found launching`)
				process.exit(0)
			}
		}
		catch (error) {
			console.error(`[${ this.name }] Cannot start application: `, error)
			process.exit(0)
		}
	}

	public async stop( incomingSignal: string ): Promise<void> {
		try {
			const application = this.Dependencies.getItem<Infrastructure.Application>(this.applicationSymbol)

			if (application) {
				console.info(`[${ this.name }] Application is found and will be stopped soon...`)
				console.log(`[${ this.name }] Incoming signal is ${ incomingSignal }.`)
				await application.stop()
				await this.stopComponents()
			}
			else {
				console.warn(`[${ this.name }] Application is not found and processing stopped.`)
			}
		}
		catch (error) {
			console.error(`[${ this.name }] Application cannot be stopped: `, error)
		}
		finally {
			process.exit(0)
		}
	}

	private async initializeComponents(): Promise<void> {
		try {
			await this.Dependencies.getItem<Infrastructure.Storage>(ComponentsSymbols.Storage).open()
			await this.Dependencies.getItem<Infrastructure.Cache>(ComponentsSymbols.Cache).open()
		}
		catch (error) {
			console.error(`[${ this.name }] Components initializing error:`, error)
		}
	}

	private async stopComponents(): Promise<void> {
		try {
			await this.Dependencies.getItem<Infrastructure.Storage>(ComponentsSymbols.Storage).close()
			await this.Dependencies.getItem<Infrastructure.Cache>(ComponentsSymbols.Cache).close()
		}
		catch (error) {
			console.error(`[${ this.name }] Components stopping error:`, error)
		}
	}

	private async onUnhandledRejection( reason, promise ): Promise<void> {
		console.error(`[${ this.name }] Unhandled rejection:`, promise)
		console.error(`[${ this.name }] Reason:`, reason)
		await this.stop(reason)
	}
}
