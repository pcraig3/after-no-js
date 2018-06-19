import React, { Component } from 'react'
import { css } from 'react-emotion'
import { ThemeContext } from './theme'
import Layout from './Layout'
import Box from './Box'

const form = css`
  button { font-size: 1em; }

  label {
    display: block;
    margin-bottom: 1em;
    }
  }
`

class Form extends Component {
  render() {
    const { theme, f } = this.props.theme

    return (
      <form className={form}>
        <Box>
          <h1>form</h1>
        </Box>
        <fieldset>
          <legend>theme colour</legend>
          <label>
            DARK<input
              type="radio"
              name="theme"
              value="dark"
              onChange={e => f(e.target.value)}
              checked={theme.name === 'dark'}
            />
          </label>
          <label>
            LIGHT<input
              type="radio"
              name="theme"
              value="light"
              onChange={e => f(e.target.value)}
              checked={theme.name === 'light'}
            />
          </label>
        </fieldset>
        {/* <button>submit</button> */}
      </form>
    )
  }
}

// export default Form

export default props => (
  <Layout>
    <ThemeContext.Consumer>
      {theme => {
        return <Form {...props} theme={theme} />
      }}
    </ThemeContext.Consumer>
  </Layout>
)
