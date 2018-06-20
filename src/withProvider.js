import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { themes, themeDefault, ThemeContext } from './theme'

const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000)

const setThemeCookie = (req, res) => {
  let { query } = req
  if (
    Object.keys(query).length && // if there is a query
    query.selectedTheme && // if there is a selectedTheme key
    themes[query.selectedTheme] // if the value is one of our themes
  ) {
    res.cookie('selectedTheme', JSON.stringify({ name: query.selectedTheme }), {
      expires: inFiveMinutes,
    })
    return true
  }
  return false
}

const getThemeCookie = req => {
  let themeName =
    req.cookies.selectedTheme && JSON.parse(req.cookies.selectedTheme).name
      ? JSON.parse(req.cookies.selectedTheme).name
      : undefined
  if (themeName && themes[themeName]) {
    return themeName
  }
  return false
}

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps({ res, req, match }) {
      let initTheme = themeDefault.selectedTheme

      if (setThemeCookie(req, res)) {
        console.log('set cookie! ' + req.query.selectedTheme)
        initTheme = themes[req.query.selectedTheme]
      } else if (getThemeCookie(req)) {
        console.log('found cookie! ' + getThemeCookie(req))
        initTheme = themes[getThemeCookie(req)]
      }
      // res.clearCookie('selectedState')

      return {
        theme: {
          selectedTheme: initTheme,
          switchTheme: themeDefault.switchTheme,
        },
      }
    }

    constructor(props) {
      super(props)

      this.switchThemeName = themeName => {
        if (themes[themeName]) {
          this.setState(
            state => ({
              theme: {
                selectedTheme: themes[themeName],
                switchTheme: state.theme.switchTheme,
              },
            }),
            () => {
              console.log('setting a cookie! ' + themeName)
              Cookies.set('selectedTheme', JSON.stringify({ name: themeName }))
            },
          )
        }
      }

      let theme =
        Cookies.getJSON('selectedTheme') &&
        Cookies.getJSON('selectedTheme').name
          ? Cookies.getJSON('selectedTheme').name
          : undefined

      let initTheme = props.theme
        ? props.theme.selectedTheme
        : theme ? themes[theme] : themeDefault.selectedTheme

      this.state = {
        theme: {
          selectedTheme: initTheme,
          switchTheme: this.switchThemeName,
        },
      }
    }

    render() {
      // don't pass in the theme as props -- we're passing the state instead
      const { theme, ...props } = this.props
      return (
        <ThemeContext.Provider value={this.state.theme}>
          <WrappedComponent {...props} />
        </ThemeContext.Provider>
      )
    }
  }
}

export default withProvider
