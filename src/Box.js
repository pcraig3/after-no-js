import React from 'react'
import withContext from './withContext'
import { themes } from './context'

const Box = ({ children, context }) => {
  let { store: { form: { selectedTheme } = {} } = {} } = context
  let theme = themes[selectedTheme] || {}

  return (
    <div
      style={{
        color: theme.foreground || '#000000',
        backgroundColor: theme.background || '#FFFFFF',
      }}
    >
      {children ? children : theme.name || 'undefined'}
    </div>
  )
}

export default withContext(Box)
