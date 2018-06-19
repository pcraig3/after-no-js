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
  constructor(props) {
    super(props)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)

    this.state = {
      themeName: props.theme.theme.name,
    }
  }

  handleChangeRadio(e) {
    this.setState({
      themeName: e.target.value,
    })
  }

  render() {
    const { switchTheme } = this.props.theme

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
              onChange={this.handleChangeRadio}
              checked={this.state.themeName === 'dark'}
            />
          </label>
          <label>
            LIGHT<input
              type="radio"
              name="theme"
              value="light"
              onChange={this.handleChangeRadio}
              checked={this.state.themeName === 'light'}
            />
          </label>
          <label>
            MONOCHROME<input
              type="radio"
              name="theme"
              value="monochrome"
              onChange={this.handleChangeRadio}
              checked={this.state.themeName === 'monochrome'}
            />
          </label>
        </fieldset>
        <button
          onClick={e => {
            e.preventDefault()
            switchTheme(this.state.themeName)
          }}
        >
          submit
        </button>
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
