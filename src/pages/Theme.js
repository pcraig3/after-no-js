import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { contextPropTypes } from '../context'
import { css } from 'react-emotion'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import ThemeBlock from '../ThemeBlock'

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

class Theme extends Component {
  static get fields() {
    return ['themeName']
  }

  static validate(values) {
    let errors = {}
    if (!['light', 'dark', 'monochrome'].includes(values.themeName)) {
      errors.themeName = true
    }
    return Object.keys(errors).length ? errors : false
  }

  constructor(props) {
    super(props)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)

    let { store: { theme: { themeName } = {} } = {} } = props.context

    this.state = {
      themeName: themeName || '',
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
        <Helmet>
          <title>THEME</title>
        </Helmet>

        <form className={form}>
          <ThemeBlock>
            <h1>theme</h1>
          </ThemeBlock>
          <fieldset>
            <legend>theme colour</legend>
            <label>
              <input
                type="radio"
                name="themeName"
                value="dark"
                onChange={this.handleChangeRadio}
                checked={this.state.themeName === 'dark'}
              />DARK
            </label>
            <label>
              <input
                type="radio"
                name="themeName"
                value="light"
                onChange={this.handleChangeRadio}
                checked={this.state.themeName === 'light'}
              />LIGHT
            </label>
            <label>
              <input
                type="radio"
                name="themeName"
                value="monochrome"
                onChange={this.handleChangeRadio}
                checked={this.state.themeName === 'monochrome'}
              />MONOCHROME
            </label>
          </fieldset>
          <button
            onClick={e => {
              e.preventDefault()
              setStore(this.props.match.path.slice(1), this.state)
            }}
          >
            submit
          </button>
        </form>
      </Layout>
    )
  }
}
Theme.propTypes = {
  ...contextPropTypes,
  match: PropTypes.object.isRequired,
}

export default withProvider(withContext(Theme))
