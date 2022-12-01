require("dotenv").config()
require("reflect-metadata")
require("source-map-support").install()

import * as Applications from "./applications"
import * as Dependencies from "./dependency"

import { ApplicationsSymbols } from "./applications/dependency-symbols"


Applications.ApplicationRunnerImpl
	.create(Dependencies.Dependencies.create(), ApplicationsSymbols.MainAPIApplication)
	.run()
	.then()
