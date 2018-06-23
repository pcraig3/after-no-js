import cookieEncrypter from 'cookie-encrypter'

const FIVE_MINUTES = new Date(new Date().getTime() + 5 * 60 * 1000)

export const SECRET = 'Immediate convocation of a Party'

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

  if (
    Object.keys(query).length // if there is a query (this means people can arbitrarily set cookies)
  ) {
    let prevCookie = getStoreCookie(req.cookies)
    // match.path === "/about" or similar
    let path = match.path.slice(1)
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
