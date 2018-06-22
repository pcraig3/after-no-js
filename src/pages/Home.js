import React, { Component } from 'react'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import Box from '../Box'

class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="Home">
          <div className="Home-header">
            <Box>
              <h1>Welcome to After.js</h1>
            </Box>
          </div>
          <p className="Home-intro">
            To get started, edit <code>src/Home.js</code> or{' '}
            <code>src/About.js</code> and save to reload.
          </p>
        </div>
      </Layout>
    )
  }
}

export default withProvider(withContext(Home))
