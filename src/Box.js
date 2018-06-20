import React from 'react'
import withTheme from './withTheme'

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

export default withTheme(Box)
