import { injectable } from "inversify"
import chalk          from "chalk"

import * as Infrastructure from "../../../infrastructure"


@injectable()
export class ConsoleLoggerImpl implements Infrastructure.Logger {

	public log( ...args: Infrastructure.LoggerParameter[] ): void {
		console.log(chalk.white(`[${this.printTime()}]`), this.normalizeArgs(args))
	}

	public success( ...args: Infrastructure.LoggerParameter[] ): void {
		console.log(chalk.white(`[${this.printTime()}]`), chalk.greenBright.underline(this.normalizeArgs(args)))
	}

	public info( ...args: Infrastructure.LoggerParameter[] ): void {
		console.log(chalk.white(`[${this.printTime()}]`), chalk.cyanBright(this.normalizeArgs(args)))
	}

	public warn( ...args: Infrastructure.LoggerParameter[] ): void {
		console.log(chalk.white(`[${this.printTime()}]`), chalk.yellow(this.normalizeArgs(args)))
	}

	public error( ...args: Infrastructure.LoggerParameter[] ): void {
		console.log(chalk.white(`[${this.printTime()}]`), chalk.red(this.normalizeArgs(args)))
	}

	private normalizeArgs( args: Infrastructure.LoggerParameter[] ): string {
		let result = ""

		for (const arg of args) {
			const argType = typeof(arg)

			if (arg instanceof(Error)) {
				result += chalk.white(`\n[${this.printTime()}] `)
				result += `Error: ${arg.name.replace(/(\\r\\n|\\n|\\r)/gm, "")}`
				result += chalk.white(`\n[${this.printTime()}] `)
				result += `Message: ${arg.message}`
				result += chalk.white(`\n[${this.printTime()}] `)
				result += `Stack: ${arg.stack}`
				result += `\n`
			}
			else if (arg === null) {
				result += "null"
			}
			else if (arg === undefined) {
				result += "undefined"
			}
			else if (argType === "function") {
				result += "function"
			}
			else if (argType === "object" || argType === "boolean") {
				result += JSON.stringify(arg, null, 2)
				result += "\n"
			}
			else {
				result += arg
			}

			result += " "
		}

		return result.trim()
	}

	private printTime(): string {
		const now = new Date()
		return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;

		function p(num: number): string {
			return num.toString().length < 2 ? '0' + num.toString() : num.toString()
		}
	}
}
