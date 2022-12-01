import * as Infrastructure from "../../"


export interface Helper {

	// String
	sanitizeString( str: string ): string


	// Number
	round( num: number ): number


	// Array
	parseStringToArray( str: string, splitBy: string ): string[]

	removeDuplicatesFromArray( arr: any[] ): any[]


	// Validators
	isValidNumber( number: any ): boolean

	isValidJsonString( str: string ): boolean

	isValidEmail( email: string ): boolean

	parseJSON( str: string ): any | null


	// Printers
	printDate( date: Date ): string

	printDay( date: Date ): string

	printNumber( num: number ): string

	printCurrency( num: number, lang: Infrastructure.Languages ): string

	printPeriod( from: Date, to: Date ): string

	printPhoneNumber( number: number ): string
}