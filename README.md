# Enchanted Next.js Router

Basically it's reexports whole `next/router` and polish its API.

## Install

```
// with npm
npm install enchanted-next-router

// with yarn
yarn add enchanted-next-router
```

## API

### Functions

Redefindes `push` and `replace`.

#### `push(url, opts)` / `replace(url, opts)`

It's drops second argument `as` because it's became unnecessary since 10.x

`const { push } = useRouter()` or `Router.push`  
`const { replace } = useRouter()` or `Router.replace`

- `url` - The URL to navigate to
- `options` - Optional object with the following configuration options:
  - `scroll` - Optional boolean, controls scrolling to the top of the page after navigation. Defaults to true
  - `shallow` - Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. Defaults to false
  - `locale` - Optional string, indicates locale of the new page

### Properties

`const { query, params, pathname } = useRouter()`

- `pathname` - Represents current pathname in the URL.
- `params` - Contains params from dynamic params of the URL. For example dynamic route is `/pages/blog/[slug]` and the current URL is `/pages/blog/my-blog-post` -> `params` is `{ slug: 'my-blog-post' }`
- `query` - Contains only params from query string. For example dynamic route is `/pages/blog/[slug]` and the current URL is `/pages/blog/my-blog-post?show=1` -> `params` is `{ show: '1' }`
