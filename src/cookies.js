const inTenMinutes = () => new Date(new Date().getTime() + 10 * 60 * 1000)

export const setStoreCookie = (setCookieFunc, cookie, options = {}) => {
  cookie = JSON.stringify(cookie)

  let defaults = {
    secure:
      !process.env.RAZZLE_COOKIE_HTTP && process.env.NODE_ENV === 'production',
    expires: inTenMinutes(),
  }

  setCookieFunc('store', cookie, { ...defaults, ...options })
}

export const getStoreCookie = cookies => {
  let cookie = cookies && cookies.store ? cookies.store : false

  if (cookie) {
    /* Cookie will only be encryped when NODE_ENV is *not* 'development' */
    try {
      cookie = JSON.parse(cookie)
    } catch (e) {
      return false
    }

    /* console.log('found cookie! ', cookie) */
  }
  return cookie
}

export const setSSRCookie = (res, key, val, prevCookie) => {
  prevCookie = prevCookie || {}
  let newCookie = { [key]: val }

  // create new cookie by merging with previous values
  let cookie = { ...prevCookie, ...newCookie }

  /* console.log('set cookie! ', cookie) */
  setStoreCookie(res.cookie.bind(res), cookie)

  return cookie
}
