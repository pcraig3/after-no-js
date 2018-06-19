import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import { Link } from 'react-router-dom'
import { ThemeContext, themes } from './theme'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 24px;
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.switchTheme = themeName => {
      if (themes[themeName]) {
        this.setState(state => ({
          theme: { theme: themes[themeName], f: state.theme.f },
        }))
      }
    }

    this.state = {
      theme: {
        f: this.switchTheme,
        theme: themes.dark,
      },
    }
  }

  render() {
    return (
      <main>
        <nav>
          <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
          <Link to="/form">Form</Link>
        </nav>
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
