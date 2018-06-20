import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { themes, themeDefault, ThemeContext } from './theme'

// const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000)

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps(props) {
      // props.res.cookie('theme', { name: 'light' })
      return { theme: themeDefault }
    }

    constructor(props) {
      super(props)

      this.switchThemeName = themeName => {
        if (themes[themeName]) {
          this.setState(state => ({
            theme: {
              theme: themes[themeName],
              switchTheme: state.theme.switchTheme,
            },
          }))
        }
      }

      // Cookies.set('theme', {name: 'light'})
      let theme = Cookies.get('theme')

      // JSON cookie values come back like 'j:{"name":"light"}'
      theme =
        typeof theme === 'string' && theme.startsWith('j:')
          ? JSON.parse(theme.slice(2))
          : theme

      let initTheme = props.theme
        ? props.theme.theme
        : theme ? theme : themeDefault.theme

      this.state = {
        theme: {
          theme: initTheme,
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
