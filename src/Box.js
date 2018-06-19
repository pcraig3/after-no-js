import React from 'react'
import { ThemeContext } from './theme'

const Box = ({ children, theme: { theme } }) => (
  <div
    style={{
      color: theme.foreground,
      backgroundColor: theme.background,
    }}
  >
    {children ? children : theme.name}
  </div>
)

export default props => (
  <ThemeContext.Consumer>
    {theme => <Box {...props} theme={theme} />}
  </ThemeContext.Consumer>
)
