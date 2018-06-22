import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { setStoreCookie, getStoreCookie, setSSRCookie } from './cookies'
import { contextDefault, Context } from './context'

function withProvider(WrappedComponent) {
  return class extends Component {
    static async getInitialProps({ res, req, match }) {
      let initStore =
        setSSRCookie(req, res, match) ||
        getStoreCookie(req.cookies) ||
        contextDefault.store

      // res.clearCookie('store')

      return {
        context: {
          store: initStore,
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

        this.setState(
          state => ({
            context: {
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

      let initStore = props.context
        ? props.context.store
        : getStoreCookie(Cookies.get()) || contextDefault.store

      this.state = {
        context: {
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
