import { FastifyInstance, HTTPMethods, FastifyRequest, FastifyReply, FastifySchema } from "fastify"


export type API = FastifyInstance

export type APIMethods = HTTPMethods

export type APIRequest = FastifyRequest

export type APIResponse = FastifyReply

export type APISchema = FastifySchema