import cookieEncrypter from 'cookie-encrypter'
import validation from './validation'

const FIVE_MINUTES = new Date(new Date().getTime() + 5 * 60 * 1000)

export const SECRET = 'Immediate convocation of a Party'

const _whitelist = ({ query, fields }) => {
  /* filter a dict by whitelisted keys
  https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
  */
  return Object.keys(query)
    .filter(key => fields.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: query[key],
      }
    }, {})
}

export const setStoreCookie = (setCookieFunc, cookie, options = {}) => {
  if (
    cookie === null || // if obj is null
    typeof cookie !== 'object' || // if obj is _not_ an object
    Object.keys(cookie).length === 0 // if obj is empty
  ) {
    throw new Error('setStoreCookie: `cookie` must be a non-empty object')
  }

  /* Only encrypt cookie when NODE_ENV is *not* 'development' */
  cookie =
    process.env.NODE_ENV === 'development'
      ? JSON.stringify(cookie)
      : cookieEncrypter.encryptCookie(JSON.stringify(cookie), { key: SECRET })

  setCookieFunc('store', cookie, options)
}

export const getStoreCookie = cookies => {
  let cookie = cookies && cookies.store ? cookies.store : false

  if (cookie) {
    /* Cookie will only be encryped when NODE_ENV is *not* 'development' */
    cookie =
      process.env.NODE_ENV === 'development'
        ? JSON.parse(cookie)
        : JSON.parse(cookieEncrypter.decryptCookie(cookie, { key: SECRET }))

    /* console.log('found cookie! ', cookie) */
  }
  return cookie
}

export const setSSRCookie = (req, res, match) => {
  let { query } = req
  // match.path === "/about" or similar
  let path = match.path.slice(1)
  let fields = [],
    validate = () => null

  if (validation && validation[path] && typeof validation[path] === 'object') {
    fields = validation[path].fields || fields
    validate = validation[path].validate || validate
  }

  // if there are no fields explicitly defined for this page, don't save anything
  if (Object.keys(query).length && fields.length) {
    // whitelist query keys so that arbitrary keys aren't saved to the store
    query = fields ? _whitelist({ query, fields }) : query

    // reset values that don't pass validation
    let errors = validate(query)
    Object.keys(errors || {}).forEach(field => {
      query[field] = ''
    })

    // create new cookie by merging with previous values
    let prevCookie = getStoreCookie(req.cookies)
    let newCookie = { [path]: query }
    let cookie = { ...prevCookie, ...newCookie }

    /* console.log('set cookie! ', cookie) */
    setStoreCookie(res.cookie.bind(res), cookie, {
      expires: FIVE_MINUTES,
    })
    return cookie
  }
  return false
}
