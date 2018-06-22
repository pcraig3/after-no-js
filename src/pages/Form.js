import React, { Component } from 'react'
import { css } from 'react-emotion'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import Box from '../Box'

export const form = css`
  button {
    font-size: 1em;
  }

  label {
    display: block;
    margin-bottom: 1em;
    width: 10em;
  }

  input[type='text'] {
    padding-bottom: 0.1rem;
    padding-left: 0.3rem;
    font-size: 1rem;
    border: 2px solid grey;
  }

  input[type='radio'] {
    margin-right: 1em;
    margin-top: -10px;
  }
`

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)

    console.log('-------------->')
    console.log(props.match)
    console.log('<--------------')

    let initThemeName =
      props.context.theme && props.context.theme.name
        ? props.context.theme.name
        : 'undefined'
    this.state = {
      themeName: initThemeName,
    }
  }

  handleChangeRadio(e) {
    this.setState({
      themeName: e.target.value,
    })
  }

  render() {
    const { setStore } = this.props.context

    return (
      <Layout>
        <form className={form}>
          <Box>
            <h1>form</h1>
          </Box>
          <fieldset>
            <legend>theme colour</legend>
            <label>
              <input
                type="radio"
                name="selectedTheme"
                value="dark"
                onChange={this.handleChangeRadio}
                checked={this.state.themeName === 'dark'}
              />DARK
            </label>
            <label>
              <input
                type="radio"
                name="selectedTheme"
                value="light"
                onChange={this.handleChangeRadio}
                checked={this.state.themeName === 'light'}
              />LIGHT
            </label>
            <label>
              <input
                type="radio"
                name="selectedTheme"
                value="monochrome"
                onChange={this.handleChangeRadio}
                checked={this.state.themeName === 'monochrome'}
              />MONOCHROME
            </label>
          </fieldset>
          <button
            onClick={e => {
              e.preventDefault()
              setStore('form', { selectedTheme: this.state.themeName })
            }}
          >
            submit
          </button>
        </form>
      </Layout>
    )
  }
}

export default withProvider(withContext(Form))
