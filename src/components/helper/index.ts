import { injectable } from "inversify"

import * as Infrastructure from "../../infrastructure"


@injectable()
export class HelperImpl implements Infrastructure.Helper {

	// String
	public sanitizeString( str: string ): string {
		return str.replace(/[^а-яa-z0-9А-Я\s]/gmi, "")
	}


	// Number
	public round( num: number ): number {
		return parseInt(num.toFixed(0))
	}


	// Array
	public parseStringToArray( str: string, splitBy: string ): string[] {
		const list = str.split(splitBy)
		return list.filter((text: string) => !!text.length)
	}

	public removeDuplicatesFromArray( arr: any[] ): any[] {
		const marked = {}
		return arr.filter((item: any) => {
			const isMarked = marked.hasOwnProperty(item)
			if (!isMarked) marked[item] = true
			return !isMarked
		})
	}


	// Validators
	public isValidNumber( number: any ): boolean {
		if (number === null || number === undefined) return false
		if (Number.isNaN(number)) return false
		return true
	}

	public isValidJsonString( str: string ): boolean {
		try { JSON.parse(str) }
		catch (e) { return false }

		return true
	}

	public isValidEmail( email: string ): boolean {
		const emailRegex = /^[\w\d\.\-_+]*@[\w\d\.\-_]*$/i
		return emailRegex.test(email)
	}

	public parseJSON( str: string ): any | null {
		let parsed
		try {
			parsed = JSON.parse(str)
		} catch (err) {
			parsed = null
		}

		return parsed
	}


	// Printers
	public printDate( date: Date ): string {
		let d = new Date(date)

		const month = d.getMonth() + 1 < 10 ? `0${ d.getMonth() + 1 }` : d.getMonth() + 1
		const day = d.getDate() < 10 ? `0${ d.getDate() }` : d.getDate()
		const hour = d.getHours() < 10 ? `0${ d.getHours() }` : d.getHours()
		const min = d.getMinutes() < 10 ? `0${ d.getMinutes() }` : d.getMinutes()
		return `${ day }.${ month }.${ d.getFullYear() } - ${ hour }:${ min }`
	}

	public printDay( date: Date ): string {
		let d = new Date(date)

		const month = d.getMonth() + 1 < 10 ? `0${ d.getMonth() + 1 }` : d.getMonth() + 1
		const day = d.getDate() < 10 ? `0${ d.getDate() }` : d.getDate()
		return `${ day }.${ month }.${ d.getFullYear() }`
	}

	public printNumber( num: number ): string {
		if (typeof (num) !== "number") return "0"
		return num.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
	}

	public printCurrency( num: number, lang: Infrastructure.Languages ): string {
		const currency = {
			[Infrastructure.Languages.UZ]: "so'm",
			[Infrastructure.Languages.RU]: "сум"
		}

		return `${ this.printNumber(num) } ${ currency[lang] }`
	}

	public printPeriod( from: Date, to: Date ): string {
		const printedFrom = this.printDay(from).replace(/:/g, ".")
		const printedTo = this.printDay(to).replace(/:/g, ".")

		return `(${ printedFrom } - ${ printedTo })`
	}

	public printPhoneNumber( number: number ): string {
		const num = number.toString()
		return `+998 (${ num.slice(0, 2) }) ${ num.slice(2, 5) }-${ num.slice(5, 7) }-${ num.slice(7, 9) }`
	}
}
