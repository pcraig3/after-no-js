import React from 'react'
import PropTypes from 'prop-types'
import withContext from './withContext'
import { themes, contextPropTypes } from './context'

const ThemeBlock = ({ children, context }) => {
  let { store: { theme: { themeName } = {} } = {} } = context
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
ThemeBlock.propTypes = {
  ...contextPropTypes,
  children: PropTypes.any,
}

export default withContext(ThemeBlock)
