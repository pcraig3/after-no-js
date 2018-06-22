import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { setCookie, setSSRCookie, getThemeCookie } from './cookies'
import { themes, contextDefault, Context } from './context'

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps({ res, req, match }) {
      /* TODO fill up the context and then choose the theme based on that */
      let initContext

      if (setSSRCookie(req, res)) {
        /* TODO this initial bit has to be genericized somehow */
        console.log('set cookie! ' + req.query.selectedTheme)
        initContext = themes[req.query.selectedTheme]
      } else if (getThemeCookie(req.cookies)) {
        console.log('found cookie! ' + getThemeCookie(req.cookies))
        initContext = themes[getThemeCookie(req.cookies)]
      }
      // res.clearCookie('selectedTheme')

      return {
        context: {
          theme: initContext || contextDefault.theme,
          store: contextDefault.store,
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
                theme: themes[themeName],
                store: state.context.store,
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

      /* TODO fill up the context and then choose the theme based on that */
      let initContext = props.context
        ? props.context.theme
        : themeName ? themes[themeName] : contextDefault.theme

      /* TODO: here we go */
      let initStore = props.context ? props.context.store : contextDefault.store

      this.state = {
        context: {
          theme: initContext,
          store: initStore,
          switchTheme: this.switchThemeName,
        },
      }
    }

    render() {
      // don't pass in the context as props -- we're passing the state instead
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
