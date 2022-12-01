require("dotenv").config()
require("source-map-support").install()


export const Config = {
	api: {
		host: String(process.env.API_HOST),
		port: Number(process.env.API_PORT),
	},
	static: {
		url: String(process.env.STATIC_URL),
		folder: String(process.env.STATIC_FOLDER),
	},
	database: {
		host: String(process.env.DB_HOST),
		port: Number(process.env.DB_PORT),
		name: String(process.env.DB_NAME),
	},
	redis: {
		host: String(process.env.REDIS_HOST),
		port: Number(process.env.REDIS_PORT),
		database: Number(process.env.REDIS_DB),
		collections: String(process.env.REDIS_DB).split(",")
	},
	authorization: {
		maxAttempts: Number(process.env.AUTH_MAX_ATTEMPTS),
		verifyCodeExpire: Number(process.env.AUTH_VERIFY_CODE_EXPIRE_IN_SECONDS),
		token: {
			header: String(process.env.AUTH_TOKEN_HEADER),
			expire: String(process.env.AUTH_TOKEN_EXPIRE),
			secret: String(process.env.AUTH_TOKEN_SECRET),
		},
	},
}