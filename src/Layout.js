import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import { ThemeContext, themes } from './theme'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.switchTheme = themeName => {
      if (themes[themeName]) {
        this.setState(state => ({
          theme: { theme: themes[themeName] },
        }))
      }
    }

    this.state = {
      theme: {
        f: this.switchTheme,
        theme: themes.light,
      },
    }
  }

  render() {
    return (
      <main>
        <ThemeContext.Provider value={this.state.theme}>
          {this.props.children}
        </ThemeContext.Provider>
      </main>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
