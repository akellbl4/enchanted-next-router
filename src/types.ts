import { UrlObject } from 'url'
import NextRouter, { NextRouter as INextRouter, SingletonRouter } from 'next/router'

import { push, replace } from './router'

export type Url = UrlObject | string
export type TransitionOptions = Parameters<typeof NextRouter.push>[2]

export type EnchantedFunctions = {
	push: typeof push
	replace: typeof replace
}

export type EnchantedSingletonRouter = Omit<SingletonRouter, 'push' | 'replace'> &
	EnchantedFunctions

export type EnchantedRouter<P> = Omit<INextRouter, 'push' | 'replace'> &
	EnchantedFunctions & {
		fullQuery: INextRouter['query']
		queryString: string | undefined
		params: P
	}
