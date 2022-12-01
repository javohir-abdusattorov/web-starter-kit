import { injectable, inject } from "inversify"
import * as Axios             from "axios"
import * as Https             from "https"

import * as Infrastructure from "../../infrastructure"

import { ComponentsSymbols } from "../dependency-symbols"


@injectable()
export class RequesterImpl implements Infrastructure.Requester {
	private axios: Axios.AxiosInstance = Axios.default.create({
		httpsAgent: new Https.Agent({
			rejectUnauthorized: false
		}),
		timeout: Number(process.env.REQUEST_TIMEOUT as string | 5000)
	})

	constructor(
		@inject(ComponentsSymbols.Logger) private Logger: Infrastructure.Logger
	) {
	}


	public async get<Response>( url: string, config?: Axios.AxiosRequestConfig ): Promise<Infrastructure.RequesterResponse<Response>> {
		const request = {
			url: url,
			headers: config?.headers,
			data: null,
			time: Date.now()
		}

		let responseBody: Infrastructure.RequesterResponse<Response>
		let responseError: Infrastructure.RequesterError
		try {
			let response = <Infrastructure.RequesterResponse>await this.axios.get(url, config)
			responseBody = {
				data: response?.data,
				status: response?.status,
				statusText: response?.statusText,
				headers: response?.headers,
				time: Date.now()
			}
			return response
		}
		catch (error) {
			responseError = {
				name: error.name,
				message: error.message,
				stack: error.stack,
				data: error.data
			}
			throw responseError
		}
		finally {
			await this.Logger.log({
				type: "HTTP",
				method: "GET",
				created_time: new Date(),
				request,
				response: {
					responseBody,
					responseError
				}
			})
		}
	}

	public async post<Response>( url: string, data?: string | object | Array<any>, config?: any ): Promise<Infrastructure.RequesterResponse<Response>> {
		const request = {
			url: url,
			headers: config?.headers,
			data: data,
			time: Date.now()
		}

		let responseBody: Infrastructure.RequesterResponse<Response>
		let responseError: Infrastructure.RequesterError
		try {
			let response = <Infrastructure.RequesterResponse>await this.axios.post(url, data, config)
			responseBody = {
				data: response?.data,
				status: response?.status,
				statusText: response?.statusText,
				headers: response?.headers,
				time: Date.now()
			}
			return response
		}
		catch (error) {
			let errorString
			try {
				errorString = JSON.stringify(error)
			}
			catch {
				errorString = error
			}

			responseError = {
				name: error.name,
				message: error.message,
				stack: error.stack,
				data: error.data,
				error: errorString
			}
			throw responseError
		}
		finally {
			await this.Logger.log({
				type: "HTTP",
				method: "POST",
				created_time: new Date(),
				request,
				response: {
					responseBody,
					responseError
				}
			})
		}
	}
}
