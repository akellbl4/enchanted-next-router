# 🧙‍♂️ Enchanted Next.js Router &bullet; ![minzipped size](https://badgen.net/bundlephobia/minzip/enchanted-next-router) [![Coverage Status](https://coveralls.io/repos/github/akellbl4/enchanted-next-router/badge.svg?branch=main)](https://coveralls.io/github/akellbl4/enchanted-next-router?branch=main)

It reexports the whole `next/router` with redefined routing functions and extended params.

## Install

With Yarn

```
yarn add enchanted-next-router
```

With npm

```
npm install enchanted-next-router
```


## API

### Functions

#### `push/replace(url, opts)`

`push` and `replace` are redefined. _The redefined fuctions haven't second argument `as` because it's became unnecessary since 10.x_

- `url: string` - The URL to navigate to
- `options` - Optional object with the following configuration options:
  - `scroll: boolean` (optional) - controls scrolling to the top of the page after navigation. `true` by default.
  - `shallow: boolean` - Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. `false` by default.
  - `locale: string` - Optional string, indicates locale of the new page.

#### Example

```js
import Router from 'enchanted-next-router

export default function MyComponent() {
  const { pathname } = useRouter()

  function handleClick() {
    // your logic
    Router.replace({ pathname, query: { id: '123' } }, { shallow: true })
  }

  return (
    <>
      <button onClick={handleClick}></button>
    </>
  )
}
```

### `const enchantedCtx = enchanteServerRouter(ctx)`

Clean query object from url dynamic params

- `params` - now params is always exist even if it is empty _params_ will be empty object `{}`
- `query` - clean up query from values from `params`
- `fullQuery` - keeps original object with all of the query params

#### Example

```js
// route: /foo/[fizz]/[buzz]
//   url: /foo/bar/boom?id=5431
import { enchanteServerRouter } from 'enchanted-next-router'

function getServerSideProps(c) {
  const ctx = enchanteServerRouter(c)
  const {
    params,    // { fizz: 'bar', buzz: 'boom' }
    query,     // { id: '5431' }
    fullQuery  // { id: '5431', fizz: 'bar', buzz: 'boom' }
  } = ctx

  return {
    props: {
      params,
      query,
      fullQuery,
    },
  }
}
```

### Properties

`const { query, params, pathname } = useRouter()`

- `pathname` - Represents current pathname in the URL.
- `params` - Contains params from dynamic params of the URL.
- `query` - Contains only params from query string.
- `fullQuery` - Contains original `query` value before changes.

#### Example

```js
// route: /foo/[fizz]/[buzz]
//   url: /foo/bar/boom?id=5431

export default function BuzzPage() {
  const {
    params,    // { fizz: 'bar', buzz: 'boom' }
    query,     // { id: '5431' }
    fullQuery  // { id: '5431', fizz: 'bar', buzz: 'boom' }
  } = useRouter()
  
  return (
    <article>
      <h4>Params</h4>
      <code><pre>JSON.stringify(params)</pre></code>
      <h4>Query</h4>
      <code><pre>JSON.stringify(query)</pre></code>
      <h4>Full Query</h4>
      <code><pre>JSON.stringify(fullQuery)</pre></code>
    </article>
  )
}
```

## References

- [Next.js Router Documentation](https://nextjs.org/docs/api-reference/next/router)
- [An Overview on the Current State of Next.js Router](https://pavel.mineev.me/blog/nextjs-router-tips-and-tricks)

## Creds

I want to say thanks to the Next.js team and Vercel. I appreciate their work and the things that they've done. I like using Next.js in my projects but I want to make some parts of it a bit better. As a result, I decided to share my handy enhancement on Next.js Router.
