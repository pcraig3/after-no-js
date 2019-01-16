# Request lifecycle

## intro

The key feature behind both [After.js](https://github.com/jaredpalmer/after.js) and [Next.js](https://github.com/zeit/next.js/) is that they give you out-of-box server-rendered stuff.

Both of them are using [`express`](https://expressjs.com/) as server backend, and then they create one route (`.get('/*')` (in our case, `.all('/*')`)) which eats every request. From the express server, you get a [Request](https://expressjs.com/en/4x/api.html#req) and [Response](https://expressjs.com/en/4x/api.html#res) object (`req` and `res`, respectively), and then you can intercept them on the server if you want.

More usefully though, both After.js and Next.js will allow you to add a [`getInitialProps({ res, req, ...more })`](https://github.com/jaredpalmer/after.js#data-fetching) function to page components. This means that your components themselves have access to the `req` and `res` objects and can do fun stuff like:

- redirect the page
- set cookies
- look at query parameters
- look at `POST`ed values
- look at browser headers

Lots of cool things.

For this app, this is how a request makes it down to a page component.

## no-js requests

When our app gets a request,

1. It starts in [server.js](https://github.com/pcraig3/after-no-js/blob/master/src/server.js#L22), it has access to the `res` and `req` parameters, and it passes in a Document that we've defined.

2. Next, it will pass through the [`getInitialProps`](https://github.com/pcraig3/after-no-js/blob/master/src/withProvider.js#L40) function defined in `withProvider`. From here, we can do some logic with `res` and `req` -- for example, we can set cookies using query parameters -- and we can pass things to our constructor by returning them. ([Here is a simple example of how to pass data using `getInitialProps`](https://github.com/jaredpalmer/after.js#data-fetching)).

   1. Note that [we can't pass through functions or Date objects](https://github.com/zeit/next.js/issues/3536) or anything because our return value gets run through `JSON.stringify` -- we can only send back objects and strings.)

3. After this, we run the [`constructor`](https://github.com/pcraig3/after-no-js/blob/master/src/withProvider.js#L81) of withProvider. If something has been passed through from `getInitialProps`, we'll have access to it here.

4. Next, we will be in our page component constructor. So, if we are on `/form`, then our  [`Form.constructor`](https://github.com/pcraig3/after-no-js/blob/master/src/pages/Form.js#L110) will run. Since [`Form` is wrapped with a `Context.Container`](https://github.com/pcraig3/after-no-js/blob/master/src/pages/Form.js#L240), it will have access to the [`context` that we set as the `withProvider` state](https://github.com/pcraig3/after-no-js/blob/master/src/withProvider.js#L122).

5. Lastly, we will `render` out the HTML.

## yes-js requests

When our app gets a request in JS-mode (this will be in like 98-99% of cases), this is what it will do:

- for the _first_ request, it will run through steps 1-4 as described above
- For each subsequent request, **it will only run through steps 3 & 4**. Since we have stopped sending server-side round-trip requests, we don't get the `res` or `req` variables anymore and for the rest of the journey we will have to do without them.

At this point, we can do whatever we need to in the page (ie, do validation or update the interface), but when we save changes, they have to be saved to the store if we want them to be available again when there is a hard refresh. ([On the Form page, we do this after pressing the submit button](https://github.com/pcraig3/after-no-js/blob/master/src/pages/Form.js#L213).)
