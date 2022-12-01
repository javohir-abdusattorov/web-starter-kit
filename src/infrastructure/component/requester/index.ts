import * as Axios from "axios"


export interface Requester {
	get<Response>( url: string, config: Axios.AxiosRequestConfig ): Promise<RequesterResponse<Response>>

	post<Response>( url: string, data: string | object | Array<any>, config: Axios.AxiosRequestConfig ): Promise<RequesterResponse<Response>>
}

export interface RequesterResponse<Data = any> extends Partial<Axios.AxiosResponse<Data>> {
	data: Data
	time: number
}

export interface RequesterError {
	name?: string
	message?: string
	stack?: string
	data?: any
	error?: string
}