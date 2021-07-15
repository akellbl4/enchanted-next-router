import { UrlObject } from 'url'
import NextRouter, {
	useRouter as useNextRouter,
	NextRouter as INextRouter,
	SingletonRouter,
} from 'next/router'
import type { GetServerSidePropsContext } from 'next'
import type { ParsedUrlQuery } from 'querystring'

import { intersectObjects } from './lib/intersect-object'
import { urlParamsToHashMap } from './lib/url-params-to-hash-map'

declare type Url = UrlObject | string
type TransitionOptions = Parameters<typeof NextRouter.push>[2]

type EnchantedFunctions = {
	push: typeof push
	replace: typeof replace
}

export type EnchantedSingletonRouter = Omit<SingletonRouter, 'push' | 'replace'> &
	EnchantedFunctions

export type EnchantedRouter = Omit<INextRouter, 'push' | 'replace'> &
	EnchantedFunctions & {
		fullQuery: INextRouter['query']
		queryString: string | undefined
		params: ParsedUrlQuery
	}

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

export function useRouter<P extends ParsedUrlQuery = {}>(): EnchantedRouter {
	const router = useNextRouter()
	const [pathname, queryString] = router.asPath.split('?')
	const query = urlParamsToHashMap(new URLSearchParams(queryString || ''))
	const params = intersectObjects({ ...router.query }, query) as P

	return {
		...router,
		pathname,
		queryString,
		query,
		params,
		fullQuery: router.query,
		push,
		replace,
	}
}

export function enchanteServerRouter<P extends ParsedUrlQuery>(ctx: GetServerSidePropsContext<P>) {
	const query = intersectObjects(ctx.query, ctx.params || {})

	return Object.assign(ctx, { query, fullQuery: ctx.query })
}

const Router: EnchantedSingletonRouter = { ...NextRouter, push, replace }

export default Router