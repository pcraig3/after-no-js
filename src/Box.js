import React from 'react'
import withContext from './withContext'

const Box = ({ children, context: { theme = {} } }) => (
  <div
    style={{
      color: theme.foreground || '#000000',
      backgroundColor: theme.background || '#FFFFFF',
    }}
  >
    {children ? children : theme.name || 'undefined'}
  </div>
)

export default withContext(Box)
