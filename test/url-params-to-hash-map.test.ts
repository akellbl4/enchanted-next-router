import { urlParamsToHashMap } from '../index'

describe('urlParamsToHashMap', () => {
	it('should return an empty hash map if no params are passed', () => {
		expect(urlParamsToHashMap(new URLSearchParams())).toEqual({})
	})
	it('should return a hash map with the params passed', () => {
		expect(urlParamsToHashMap(new URLSearchParams('foo=bar&bar=foo'))).toEqual({
			foo: 'bar',
			bar: 'foo',
		})
		expect(urlParamsToHashMap(new URLSearchParams('foo=bar&bar=foo&bar=buzz'))).toEqual({
			foo: 'bar',
			bar: ['foo', 'buzz'],
		})
	})
})
