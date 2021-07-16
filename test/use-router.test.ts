/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks'
import * as router from 'next/router'

import { useRouter } from '../src/router'

describe('useRouter', () => {
	it('should return router', () => {
		jest.spyOn(router, 'useRouter').mockReturnValue({
			route: '/foo/[id]',
			pathname: '/foo/[id]',
			asPath: '/foo/bar?fizz=buzz',
			query: { id: 'bar', fizz: 'buzz' },
		} as unknown as router.NextRouter)

		const { result } = renderHook(() => useRouter())

		expect(result.current).toMatchObject({
			asPath: '/foo/bar?fizz=buzz',
			route: '/foo/[id]',
			pathname: '/foo/bar',
			params: { id: 'bar' },
			query: { fizz: 'buzz' },
			fullQuery: { id: 'bar', fizz: 'buzz' },
		})
	})

	it.each([
		[
			'without any params',
			{
				route: '/foo',
				pathname: '/foo',
				asPath: '/foo',
				query: {},
			},
			{
				route: '/foo',
				pathname: '/foo',
				asPath: '/foo',
				query: {},
				params: {},
				fullQuery: {},
			},
		],
		[
			'without any query (longer pathname)',
			{
				route: '/foo/bar',
				pathname: '/foo/bar',
				asPath: '/foo/bar',
				query: {},
			},
			{
				route: '/foo/bar',
				pathname: '/foo/bar',
				asPath: '/foo/bar',
				query: {},
				params: {},
				fullQuery: {},
			},
		],
		[
			'with query',
			{
				route: '/foo',
				pathname: '/foo',
				asPath: '/foo?fizz=buzz',
				query: { fizz: 'buzz' },
			},
			{
				route: '/foo',
				pathname: '/foo',
				asPath: '/foo?fizz=buzz',
				query: { fizz: 'buzz' },
				params: {},
				fullQuery: { fizz: 'buzz' },
			},
		],
		[
			'with query',
			{
				route: '/foo/bar',
				pathname: '/foo/bar',
				asPath: '/foo/bar?fizz=buzz',
				query: { fizz: 'buzz' },
			},
			{
				route: '/foo/bar',
				pathname: '/foo/bar',
				asPath: '/foo/bar?fizz=buzz',
				params: {},
				query: { fizz: 'buzz' },
				fullQuery: { fizz: 'buzz' },
			},
		],
		[
			'with params',
			{
				route: '/foo/[id]',
				pathname: '/foo/[id]',
				asPath: '/foo/bar',
				query: { id: 'bar' },
			},
			{
				route: '/foo/[id]',
				pathname: '/foo/bar',
				asPath: '/foo/bar',
				params: { id: 'bar' },
				query: {},
				fullQuery: { id: 'bar' },
			},
		],
		[
			'with params and query',
			{
				route: '/foo/[id]',
				pathname: '/foo/[id]',
				asPath: '/foo/bar?fizz=buzz',
				query: { id: 'bar', fizz: 'buzz' },
			},
			{
				route: '/foo/[id]',
				pathname: '/foo/bar',
				asPath: '/foo/bar?fizz=buzz',
				params: { id: 'bar' },
				query: { fizz: 'buzz' },
				fullQuery: { id: 'bar', fizz: 'buzz' },
			},
		],
		[
			'with params (more params)',
			{
				route: '/foo/[category]/[id]',
				pathname: '/foo/[category]/[id]',
				asPath: '/foo/posts/1',
				query: { category: 'posts', id: '1' },
			},
			{
				route: '/foo/[category]/[id]',
				pathname: '/foo/posts/1',
				asPath: '/foo/posts/1',
				params: { category: 'posts', id: '1' },
				query: {},
				fullQuery: { category: 'posts', id: '1' },
			},
		],
		[
			'with params and query (more params)',
			{
				route: '/foo/[category]/[id]',
				pathname: '/foo/[category]/[id]',
				asPath: '/foo/posts/1?fizz=buzz',
				query: { fizz: 'buzz', category: 'posts', id: '1' },
			},
			{
				pathname: '/foo/posts/1',
				route: '/foo/[category]/[id]',
				asPath: '/foo/posts/1?fizz=buzz',
				params: { category: 'posts', id: '1' },
				query: { fizz: 'buzz' },
				fullQuery: { fizz: 'buzz', category: 'posts', id: '1' },
			},
		],
	])('should return redefined router %s', (_, mock, expected) => {
		jest.spyOn(router, 'useRouter').mockReturnValueOnce(mock as router.NextRouter)

		const { result } = renderHook(() => useRouter())

		expect(result.current.pathname).toBe(expected.pathname)
		expect(result.current.params).toEqual(expected.params)
		expect(result.current.query).toEqual(expected.query)
		expect(result.current.fullQuery).toEqual(mock.query)
	})
})
