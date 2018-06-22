import cookieEncrypter from 'cookie-encrypter'
import { themes } from './context'

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
  cookie = JSON.stringify(cookie)
  let encryptedCookie = cookieEncrypter.encryptCookie(cookie, { key: SECRET })
  setCookieFunc('store', encryptedCookie, options)
}

export const getStoreCookie = cookies => {
  let cookie = cookies.store
  return cookie
    ? JSON.parse(cookieEncrypter.decryptCookie(cookie, { key: SECRET }))
    : false
}

export const setSSRCookie = (req, res) => {
  let { query } = req
  if (
    Object.keys(query).length && // if there is a query
    query.selectedTheme && // if there is a selectedTheme key
    themes[query.selectedTheme] // if the value is one of our themes <- can't do this anymore
  ) {
    setStoreCookie(
      res.cookie.bind(res),
      { form: { selectedTheme: query.selectedTheme } },
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
