import * as Entities from "../../../entities"
import * as Infrastructure from "../../../infrastructure"


export namespace UserInterfaces {

	export namespace GetAll {

		export const Method: Infrastructure.APIMethods = "GET"

		export const Url: string = "/users"

		export interface Request extends Infrastructure.APIRequest {
			body: {
				sort: boolean
			},
			params: {},
		}

		export const Validation: Infrastructure.APISchema = {
			response: {
				200: {
					type: "object",
					properties: {
						documents: {
							type: "array",
							maxItems: 10,
							// items: { type: "" },
						},
					},
				},
			},
		}

		export interface Response {
			documents: Entities.User[]
		}

	}

}