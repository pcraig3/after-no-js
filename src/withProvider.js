import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { setStoreCookie, setSSRCookie, getThemeCookie } from './cookies'
import { themes, contextDefault, Context } from './context'

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps({ res, req, match }) {
      /* TODO fill up the context and then choose the theme based on that */
      let initContext

      /* TODO have to get this cookie first and then merge in query params */
      if (setSSRCookie(req, res)) {
        /* TODO this initial bit has to be genericized somehow */
        console.log('set cookie! ' + req.query.selectedTheme)
        initContext = themes[req.query.selectedTheme]
      } else if (getThemeCookie(req.cookies)) {
        console.log('found cookie! ' + getThemeCookie(req.cookies))
        initContext = themes[getThemeCookie(req.cookies)]
      }
      // res.clearCookie('store')

      console.log(match)
      return {
        context: {
          theme: initContext || contextDefault.theme,
          store: contextDefault.store,
          setStore: contextDefault.setStore,
        },
      }
    }

    constructor(props) {
      super(props)

      this.setStore = (key, obj = null) => {
        if (typeof key !== 'string') {
          throw new Error('setStore: `key` must be a string value')
        }
        if (
          obj === null || // if obj is null
          typeof obj !== 'object' || // if obj is _not_ an object
          Object.keys(obj).length === 0 // if obj is empty
        ) {
          throw new Error('setStore: `obj` must be a non-empty object')
        }

        let newState = { [key]: obj }
        let newTheme

        /* TODO this is dumb */
        if (obj.selectedTheme && themes[obj.selectedTheme]) {
          newTheme = themes[obj.selectedTheme]
        }

        this.setState(
          state => ({
            context: {
              theme: newTheme || state.context.theme,
              store: { ...state.context.store, ...newState },
              setStore: state.context.setStore,
            },
          }),
          () => {
            console.log('setting a cookie! ', this.state.context.store)
            setStoreCookie(Cookies.set.bind(Cookies), this.state.context.store)
          },
        )
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
          setStore: this.setStore,
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
