import React from 'react'

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
  theme: themes.light,
  store: { form: { selectedTheme: 'light' } } /* TODO remove this */,
  switchTheme: null,
}

export const Context = React.createContext(contextDefault)
