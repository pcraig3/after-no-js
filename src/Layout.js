import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import { Link } from 'react-router-dom'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 24px;
  }
`

class Layout extends React.Component {
  render() {
    return (
      <main>
        <nav>
          <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
          <Link to="/form">Form</Link>
        </nav>
        {this.props.children}
      </main>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
