import type { ParsedUrlQuery } from 'querystring'

export function urlParamsToHashMap(params: URLSearchParams): ParsedUrlQuery {
	const result: ParsedUrlQuery = {}

	params.forEach((_, key) => {
		const value = params.getAll(key)
		result[key] = value.length === 1 ? value[0] : value
	})

	return result
}
