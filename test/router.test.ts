import { Router } from '../src/router'

describe('Router', () => {
	it('should be defined', () => {
		expect(Router).toBeDefined()
	})
	it('should have events', () => {
		expect(Router).toHaveProperty('events')
		expect(Router.events).toHaveProperty('on')
		expect(Router.events).toHaveProperty('off')
		expect(Router.events).toHaveProperty('emit')
	})
})
