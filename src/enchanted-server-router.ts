import type { ParsedUrlQuery } from "querystring"
import type { GetServerSidePropsContext } from 'next'

import { intersectObjects } from "./lib/intersect-object"

export function enchanteServerRouter<P extends ParsedUrlQuery>(ctx: Omit<GetServerSidePropsContext<P>, 'params'> & { params: P }) {
	const params = ctx.params || {}
	const query = intersectObjects(ctx.query, params)

	return Object.assign(ctx, { params, query, fullQuery: ctx.query })
}
