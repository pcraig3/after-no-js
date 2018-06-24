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

    setStoreCookie(
      res.cookie.bind(res),
      { ...prevCookie, ...newCookie },
      {
        expires: FIVE_MINUTES,
      },
    )
    return true
  }
  return false
}

/* TODO: change name */
export const getThemeCookie = cookies => {
  if (!cookies) {
    return false
  }

  let store = getStoreCookie(cookies)
  let { form: { selectedTheme } = {} } = store

  if (selectedTheme) {
    return selectedTheme
  }
  return false
}
