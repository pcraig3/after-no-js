import React from 'react'
import { ThemeContext } from './theme'

const Box = props => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div
          {...props}
          style={{ color: theme.foreground, backgroundColor: theme.background }}
        >
          {theme.name}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default Box
