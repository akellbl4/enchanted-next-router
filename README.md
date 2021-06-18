# Enchanted Next.js Router

![minzipped size](https://badgen.net/bundlephobia/minzip/enchanted-next-router)

It reexports the whole `next/router` with redefined routing functions and extended params.

## Install

With npm

```
$ npm install enchanted-next-router
```

With yarn

```
$ yarn add enchanted-next-router
```

## API

### Functions

Redefindes `push` and `replace`.

#### `push(url, opts)` / `replace(url, opts)`

Drops second argument `as` because it's became unnecessary since 10.x

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
- `params` - Contains params from dynamic params of the URL.
  For example dynamic route is `/pages/blog/[slug]` and the current URL is `/pages/blog/my-blog-post` -> `params` is `{ slug: 'my-blog-post' }`
- `query` - Contains only params from query string.
  For example dynamic route is `/pages/blog/[slug]` and the current URL is `/pages/blog/my-blog-post?show=1` -> `params` is `{ show: '1' }`

## References

- [Next.js Router Documentation](https://nextjs.org/docs/api-reference/next/router)
- [An Overview on the Current State of Next.js Router](https://pavel.mineev.me/blog/nextjs-router-tips-and-tricks)

## Creds

I want to say thanks to the Next.js team and Vercel. I appreciate their work and the things that they've done. I like using Next.js in my projects but I want to make some parts of it a bit better. As a result, I decided to share my handy enhancement on Next.js Router.
