import React from 'react'
import withContext from './withContext'

const Box = ({ children, context: { selectedTheme = {} } }) => (
  <div
    style={{
      color: selectedTheme.foreground || '#000000',
      backgroundColor: selectedTheme.background || '#FFFFFF',
    }}
  >
    {children ? children : selectedTheme.name || 'undefined'}
  </div>
)

export default withContext(Box)
