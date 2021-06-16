import { UrlObject } from 'url'
import NextRouter, { useRouter as useNextRouter } from 'next/router'

declare type Url = UrlObject | string
interface TransitionOptions {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

/**
 * Performs a `pushState` with arguments
 * @param url of the route
 * @param options object you can define `shallow` and other options
 */
function push(url: Url, opts?: TransitionOptions) {
  return NextRouter.push(url, undefined, opts)
}

/**
 * Performs a `replaceState` with arguments
 * @param url of the route
 * @param options object you can define `shallow` and other options
 */
function replace(url: Url, opts?: TransitionOptions) {
  return NextRouter.replace(url, undefined, opts)
}

export function useRouter() {
  const router = useNextRouter()
  const [pathname, queryString = ''] = router.asPath.split('?')
  const searchParams = new URLSearchParams(queryString)
  const params = { ...router.query }
  const query: Record<string, string | string[]> = {}

  searchParams.forEach((value, key) => {
    if (params[key]) {
      delete params[key]
    }

    const currentValue = query[key]

    if (Array.isArray(currentValue)) {
      currentValue.push(key)
      return
    }

    if (typeof currentValue === 'string') {
      query[key] = [currentValue, value]
      return
    }

    query[key] = value
  })

  return {
    ...router,
    pathname,
    queryString,
    query,
    params,
    push,
    replace
  }
}

const Router: Omit<typeof NextRouter, 'push' | 'replace'> & {
  push: typeof push
  replace: typeof replace
} = { ...NextRouter, push, replace }

export default Router
