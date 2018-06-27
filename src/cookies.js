import cookieEncrypter from 'cookie-encrypter'

const inTenMinutes = () => new Date(new Date().getTime() + 10 * 60 * 1000)

export const SECRET = 'Immediate convocation of a Party'

export const setStoreCookie = (setCookieFunc, cookie, options = {}) => {
  cookie = cookieEncrypter.encryptCookie(JSON.stringify(cookie), {
    key: SECRET,
  })

  let expires = {
    expires: inTenMinutes(),
  }

  setCookieFunc('store', cookie, { ...expires, ...options })
}

export const getStoreCookie = cookies => {
  let cookie = cookies && cookies.store ? cookies.store : false

  if (cookie) {
    /* Cookie will only be encryped when NODE_ENV is *not* 'development' */
    try {
      cookie = JSON.parse(
        cookieEncrypter.decryptCookie(cookie, { key: SECRET }),
      )
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
