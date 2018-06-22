import React, { Component } from 'react'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import Box from '../Box'
import { form } from './Form'

class Validation extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)

    let {
      store: { validation: { notEmpty, number } = {} } = {},
    } = props.context

    this.state = {
      notEmpty: notEmpty || '',
      number: number || '',
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { setStore } = this.props.context

    return (
      <Layout>
        <form className={form}>
          <Box>
            <h1>validation</h1>
          </Box>
          <label>
            NOT EMPTY{' '}
            <input
              id="notEmpty"
              name="notEmpty"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.notEmpty}
            />
          </label>
          <label>
            NUMBER{' '}
            <input
              id="number"
              name="number"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.number}
            />
          </label>
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

export default withProvider(withContext(Validation))
