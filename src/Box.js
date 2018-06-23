import React from 'react'
import PropTypes from 'prop-types'
import withContext from './withContext'
import { themes, contextPropTypes } from './context'

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
Box.propTypes = {
  ...contextPropTypes,
  children: PropTypes.any,
}

export default withContext(Box)
