import NextRouter, { useRouter as useNextRouter } from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

import { intersectObjects } from './lib/intersect-object'
import { urlParamsToHashMap } from './lib/url-params-to-hash-map'
import type { Url, TransitionOptions, EnchantedRouter, EnchantedSingletonRouter } from './types'

/**
 * Performs a `pushState` with arguments
 * @param url of the route
 * @param options object you can define `shallow` and other options
 */
export function push(url: Url, opts?: TransitionOptions) {
	return NextRouter.push(url, undefined, opts)
}

/**
 * Performs a `replaceState` with arguments
 * @param url of the route
 * @param options object you can define `shallow` and other options
 */
export function replace(url: Url, opts?: TransitionOptions) {
	return NextRouter.replace(url, undefined, opts)
}

export function useRouter<P extends ParsedUrlQuery>(): EnchantedRouter<P> {
	const router = useNextRouter()
	const [pathname, queryString] = router.asPath.split('?')
	const [, hash = ''] = router.asPath.split('#')
	const query = urlParamsToHashMap(new URLSearchParams(queryString || ''))
	const params = intersectObjects({ ...router.query }, query) as P

	return {
		...router,
		pathname,
		queryString,
		query,
		hash,
		params,
		fullQuery: router.query,
		push,
		replace,
	}
}

Object.defineProperties(NextRouter, {
	push: {
		value: push,
	},
	replace: {
		value: replace,
	},
})

export const Router = NextRouter as EnchantedSingletonRouter
