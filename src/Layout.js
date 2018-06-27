import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, css } from 'emotion'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 24px;
  }

  button {
    font-size: 1em;
  }
`

const nav = css`
  > * {
    display: inline-block;
  }

  nav {
    width: 60%;
  }

  form {
    width: 40%;
    text-align: right;

    span {
      display: inline-block;
      margin-bottom: 0.5em;
    }

    button {
      margin-left: 0.5em;
    }
  }
`

class Layout extends React.Component {
  render() {
    return (
      <main>
        <div className={nav}>
          <nav>
            <Link to="/">Home</Link> <Link to="/values">Values</Link>{' '}
            <Link to="/theme">Theme</Link> <Link to="/form">Form</Link>
          </nav>
          <LanguageSwitcher />
        </div>
        {this.props.children}
      </main>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
