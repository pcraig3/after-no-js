import cookieEncrypter from 'cookie-encrypter'
import { themes } from './context'

const FIVE_MINUTES = new Date(new Date().getTime() + 5 * 60 * 1000)

export const SECRET = 'Immediate convocation of a Party'

export const setCookie = (setCookieFunc, cookie, options = {}) => {
  cookie = typeof cookie === 'string' ? cookie : JSON.stringify(cookie)
  let encryptedCookie = cookieEncrypter.encryptCookie(cookie, { key: SECRET })
  setCookieFunc('selectedTheme', encryptedCookie, options)
}

export const getCookie = cookies => {
  let cookie = cookies.selectedTheme
  return cookie
    ? JSON.parse(cookieEncrypter.decryptCookie(cookie, { key: SECRET }))
    : false
}

export const setSSRCookie = (req, res) => {
  let { query } = req
  if (
    Object.keys(query).length && // if there is a query
    query.selectedTheme && // if there is a selectedTheme key
    themes[query.selectedTheme] // if the value is one of our themes
  ) {
    setCookie(
      res.cookie.bind(res),
      { name: query.selectedTheme },
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

  let selectedTheme = getCookie(cookies)

  if (selectedTheme && selectedTheme.name && themes[selectedTheme.name]) {
    return selectedTheme.name
  }
  return false
}
