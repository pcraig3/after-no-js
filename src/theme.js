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

export const themeDefault = {
  theme: themes.light,
  switchTheme: null,
}

export const ThemeContext = React.createContext(themeDefault)
