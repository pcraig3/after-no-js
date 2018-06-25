# After.js w/ React context and browser cookies

JS-agnostic proof-of-concept app.

Able to:
- ✅ save form values to global state in a fairly generic way between pages
- ✅ easily do form validation stuff (validation logic, on-screen errors, etc.)
- ✅ whitelist saveable values on a per-page basis
- ✅ preserve your `this.state` even after doing a hard refresh
- ✅ turn JS on or off at any point in the flow without losing data
- ✅ wow your friends

Still checking out:
- 🤔 is it possible to redirect after a successful submit without JS?

## Setup

- clone repo && `cd` into it
- `yarn`
- `yarn start`
- visit [localhost:3000](http://localhost:3000)
- 🚀🚀🚀🚀🚀🚀🚀🚀

## Idea behind the example

[After.js](https://github.com/jaredpalmer/after.js) gives us out-of-the-box server-rendered React sites -- very similar to what [Next.js](https://github.com/zeit/next.js) is doing. This means static sites are pretty easy, but for dynamic-y flows (ie, forms or language settings) we needed to solve a couple problems:
1. somewhere to easily store/retrieve global data
2. it works without client-side JavaScript

### App-wide data store

Global data is stored / passed around using [React context](https://reactjs.org/docs/context.html).
Means we can update themes and/or locale strings and/or form values where needed.

(The other option would have been Redux but I assumed a steeper learning curve.)

### No-JS

I'm using encrypted cookies to store values so that they stick around between page loads.
Updating the global state always sets a browser cookie, and global state is hydrated from browser cookies on both client and server-side refreshes so you always have your data.

The means we can pre-populate fields, validate errors, or pass saved values to other parts of the app whether or not the client runs JavaScript.

## FAQ

#### q: wow thats so cool

a: yes

#### q: why did u do this?

a: pls see [previous question](https://github.com/pcraig3/after-no-js#q-wow-thats-so-cool)
