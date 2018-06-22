import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { setCookie, setSSRCookie, getThemeCookie } from './cookies'
import { themes, contextDefault, Context } from './context'

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps({ res, req, match }) {
      let initContext = contextDefault.selectedTheme

      if (setSSRCookie(req, res)) {
        console.log('set cookie! ' + req.query.selectedTheme)
        initContext = themes[req.query.selectedTheme]
      } else if (getThemeCookie(req.cookies)) {
        console.log('found cookie! ' + getThemeCookie(req.cookies))
        initContext = themes[getThemeCookie(req.cookies)]
      }
      // res.clearCookie('selectedTheme')

      return {
        context: {
          selectedTheme: initContext,
          switchTheme: contextDefault.switchTheme,
        },
      }
    }

    constructor(props) {
      super(props)

      this.switchThemeName = themeName => {
        if (themes[themeName]) {
          this.setState(
            state => ({
              context: {
                selectedTheme: themes[themeName],
                switchTheme: state.context.switchTheme,
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

      let initContext = props.context
        ? props.context.selectedTheme
        : themeName ? themes[themeName] : contextDefault.selectedTheme

      this.state = {
        context: {
          selectedTheme: initContext,
          switchTheme: this.switchThemeName,
        },
      }
    }

    render() {
      // don't pass in the theme as props -- we're passing the state instead
      const { context, ...props } = this.props
      return (
        <Context.Provider value={this.state.context}>
          <WrappedComponent {...props} />
        </Context.Provider>
      )
    }
  }
}

export default withProvider
