import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { setCookie, setSSRCookie, getThemeCookie } from './cookies'
import { themes, themeDefault, ThemeContext } from './theme'

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps({ res, req, match }) {
      let initTheme = themeDefault.selectedTheme

      if (setSSRCookie(req, res)) {
        console.log('set cookie! ' + req.query.selectedTheme)
        initTheme = themes[req.query.selectedTheme]
      } else if (getThemeCookie(req.cookies)) {
        console.log('found cookie! ' + getThemeCookie(req.cookies))
        initTheme = themes[getThemeCookie(req.cookies)]
      }
      // res.clearCookie('selectedTheme')

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
              setCookie(Cookies.set.bind(Cookies), { name: themeName })
            },
          )
        }
      }

      let themeName = getThemeCookie(Cookies.get())

      let initTheme = props.theme
        ? props.theme.selectedTheme
        : themeName ? themes[themeName] : themeDefault.selectedTheme

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
