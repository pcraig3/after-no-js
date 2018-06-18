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
    this.state = {
      theme: themes.light,
    }

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }))
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
