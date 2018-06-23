import React from 'react'
import PropTypes from 'prop-types'

export const themes = {
  monochrome: {
    foreground: '#333333',
    background: '#dddddd',
    name: 'monochrome',
  },
  light: {
    foreground: '#ffd900',
    background: '#cd0000',
    name: 'light',
  },
  dark: {
    foreground: '#ffd900',
    background: '#000000',
    name: 'dark',
  },
}

export const contextDefault = {
  store: {},
  setStore: null,
}

export const contextPropTypes = {
  context: PropTypes.shape({
    store: PropTypes.object.isRequired,
    setStore: PropTypes.func.isRequired,
  }),
}

export const Context = React.createContext(contextDefault)
