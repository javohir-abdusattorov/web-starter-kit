import * as Entities from "../../../entities"


export interface AuthorizationService {
	verifyToken( token: string ): Promise<AuthorizationPayload | null>

	createToken( user: Entities.User ): Promise<string>
}

export interface AuthorizationPayload {
	id: string
	username: string
}