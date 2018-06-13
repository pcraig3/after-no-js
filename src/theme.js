import React from 'react'

export const themes = {
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

export const ThemeContext = React.createContext(
  themes.light, // default value
)
