import React from 'react'
import withContext from './withContext'
import { themes } from './context'

const Box = ({ children, context }) => {
  let { store: { form: { themeName } = {} } = {} } = context
  let theme = themes[themeName] || {}

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
