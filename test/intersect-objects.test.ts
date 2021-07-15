import { intersectObjects } from '../index'

describe('intersectObjects', () => {
	it('should filter interct fields', () => {
		expect(intersectObjects({ a: false, b: false, c: false }, { a: false, b: false })).toEqual({
			c: false,
		})

		expect(
			intersectObjects({ a: false, b: false, c: false }, { a: false, b: false, c: false })
		).toEqual({})

		expect(intersectObjects({ a: false }, { b: false })).toEqual({ a: false })
		expect(intersectObjects({ a: false }, {})).toEqual({ a: false })
		expect(intersectObjects({}, {})).toEqual({})
		expect(intersectObjects({}, { a: false })).toEqual({})
	})
})
