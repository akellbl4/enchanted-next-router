export function intersectObjects<
	T1 extends { [k: string]: unknown },
	T2 extends { [k: string]: unknown }
>(source: T1, filter: T2) {
	return Object.keys(filter).reduce(
		(acc, key) => {
			if (key in acc) {
				delete acc[key]
			}
			return acc
		},
		{ ...source }
	)
}
