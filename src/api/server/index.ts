import { inject, injectable } from "inversify"
import Fastify                from "fastify"
import FileUpload             from "fastify-file-upload"
import FastifyJWT             from "@fastify/jwt"
import FastifyStatic          from "@fastify/static"

import * as Infrastructure from "../../infrastructure"
import * as API            from "../"

import { Config }            from "../../config"
import { APISymbols }        from "../dependency-symbols"
import { ComponentsSymbols } from "../../components/dependency-symbols"


@injectable()
export class APIServer {
	private server: Infrastructure.API

	constructor(
		@inject(ComponentsSymbols.Logger) private Logger: Infrastructure.Logger,
		@inject(APISymbols.Register) private APIRegister: API.APIRegister,
	) {
	}

	public async initialize(): Promise<void> {
		this.server = Fastify()

		// Register static plugins
		this.registerPlugins()

		// Register API handlers
		await this.APIRegister.execute(this.server)
	}

	public async start(): Promise<void> {
		const location = await this.server.listen({
			host: Config.api.host,
			port: Config.api.port,
		})
		this.Logger.info(`Server is listening on: ${ location }`)
	}

	public async stop(): Promise<void> {
		await this.server.server.close()
		this.Logger.warn(`Server closed on`)
	}

	private registerPlugins(): void {
		// Auth
		this.server.register(FastifyJWT, {
			secret: Config.authorization.token.secret,
		})

		// File upload
		this.server.register(FileUpload)

		// Static file serving
		this.server.register(FastifyStatic, {
			root: Config.static.folder,
			prefix: "/public/",
		})
	}

	private registerDecorators(): void {
		this.server.decorate("authenticate", async function (req, res) {
			try {
				await req.jwtVerify()
			} catch (err) {
				res.send(err)
			}
		})
	}
}