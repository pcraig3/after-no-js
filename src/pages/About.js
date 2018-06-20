import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withProvider from '../withProvider'
import withTheme from '../withTheme'
import Box from '../Box'
import Layout from '../Layout'

class About extends Component {
  render() {
    const { theme: { selectedTheme: { name } = {} } = {} } = this.props
    return (
      <Layout>
        <div>
          <Helmet>
            <title>ABOUT - {name ? 'WITH THEME: ' + name : 'NO THEME'}</title>
          </Helmet>
          <h1>
            <Box />
          </h1>
          <p>about page {name ? 'with theme: ' + name : 'no theme'}</p>
        </div>
      </Layout>
    )
  }
}

export default withProvider(withTheme(About))
