import { GetServerSidePropsContext } from 'next'
import { enchanteServerRouter } from '../src/enchanted-server-router'

describe('enchanted-server-router', () => {
	it('should return empty params', () => {
		expect(enchanteServerRouter({} as unknown as GetServerSidePropsContext).params).toEqual({})
	})
	it('should return params', () => {
		expect(enchanteServerRouter({ params: { a: 1, b: 2 } } as unknown as GetServerSidePropsContext).params).toEqual({ a: 1, b: 2 })
	})
})
