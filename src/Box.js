import React from 'react'
import withTheme from './withTheme'

const Box = ({ children, theme: { selectedTheme } }) => (
  <div
    style={{
      color: selectedTheme.foreground,
      backgroundColor: selectedTheme.background,
    }}
  >
    {children ? children : selectedTheme.name}
  </div>
)

export default withTheme(Box)
