import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { setStoreCookie, getStoreCookie, setSSRCookie } from './cookies'
import { contextDefault, Context } from './context'

const _whitelist = ({ val, fields }) => {
  /*
  filter a dict by whitelisted keys
  returns new object -- does not mutate passed-in object
  https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
  */
  return Object.keys(val)
    .filter(key => fields.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: val[key],
      }
    }, {})
}

function withProvider(WrappedComponent) {
  class WithProvider extends Component {
    static async getInitialProps({ res, req, match }) {
      let initStore =
        setSSRCookie(
          req,
          res,
          match,
          WrappedComponent.fields,
          WrappedComponent.validate,
        ) ||
        getStoreCookie(req.cookies) ||
        contextDefault.store

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
            /* console.log('setting a cookie! ', this.state.context.store) */
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
      const { context, ...props } = this.props // eslint-disable-line no-unused-vars
      return (
        <Context.Provider value={this.state.context}>
          <WrappedComponent {...props} />
        </Context.Provider>
      )
    }

    static get globalFields() {
      return ['language']
    }

    static validate(values) {
      let errors = {}
      if (!['en', 'fr'].includes(values.language)) {
        errors.language = true
      }
      return Object.keys(errors).length ? errors : false
    }

    static validateCookie(key, val = null) {
      /*
      validation method for both server-side and client-side cookies
      returns either a sanitised `val` object else false
      */

      if (typeof key !== 'string' || !key.length) {
        throw new Error('validate: `key` must be a non-empty string')
      }

      // check if a global setting
      if (WithProvider.globalFields.includes(key)) {
        // val must be a string
        if (typeof val !== 'string' || !val.length) {
          throw new Error('validate: `val` must be a non-empty string')
        }

        // have to pass the key in as well since this value is a string
        let errors = WithProvider.validate({ [key]: val })

        // return the value if no validation errors
        return !errors ? val : false
      }

      const fields = WrappedComponent.fields
      const validate = WrappedComponent.validate

      // else, check if a non-global setting
      if (
        fields &&
        fields.length && // there are fields explicitly defined
        typeof validate === 'function' // there is a validate function passed-in
      ) {
        // if not a global setting, val must be a non-empty object
        if (
          val === null ||
          typeof val !== 'object' ||
          Array.isArray(val) ||
          Object.keys(val).length === 0
        ) {
          throw new Error('validate: `val` must be a non-empty object')
        }

        // whitelist query keys so that arbitrary keys aren't saved to the store
        val = _whitelist({ val, fields })

        // clear values that don't pass validation
        let errors = validate(val)
        Object.keys(errors || {}).forEach(field => {
          val[field] = ''
        })

        // return the sanitised val
        return val
      }

      return false
    }
  }
  WithProvider.propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      setStore: null,
    }),
  }
  return WithProvider
}

export default withProvider
