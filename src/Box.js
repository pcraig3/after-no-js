import React from 'react'
import withTheme from './withTheme'

const Box = ({ children, theme: { selectedTheme = {} } }) => (
  <div
    style={{
      color: selectedTheme.foreground || '#000000',
      backgroundColor: selectedTheme.background || '#FFFFFF',
    }}
  >
    {children ? children : selectedTheme.name || 'undefined'}
  </div>
)

export default withTheme(Box)
