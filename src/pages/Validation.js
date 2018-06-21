import React, { Component } from 'react'
import withProvider from '../withProvider'
import withTheme from '../withTheme'
import Layout from '../Layout'
import Box from '../Box'
import { form } from './Form'

class Validation extends Component {
  constructor(props) {
    super(props)

    console.log(props)
  }

  render() {
    return (
      <Layout>
        <form className={form}>
          <Box>
            <h1>validation</h1>
          </Box>
          <label>
            NOT EMPTY <input id="notEmpty" name="notEmpty" type="text" />
          </label>
          <label>
            NUMBER <input id="number" name="number" type="text" />
          </label>
          <button>submit</button>
        </form>
      </Layout>
    )
  }
}

export default withProvider(withTheme(Validation))
