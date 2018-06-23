import React, { Component } from 'react'
import { contextPropTypes } from '../context'
import { Helmet } from 'react-helmet'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Box from '../Box'
import Layout from '../Layout'

class About extends Component {
  render() {
    const {
      context: { store: { form: { themeName } = {} } = {} } = {},
    } = this.props
    return (
      <Layout>
        <div>
          <Helmet>
            <title>
              ABOUT - {themeName ? 'WITH THEME: ' + themeName : 'NO THEME'}
            </title>
          </Helmet>
          <h1>
            <Box />
          </h1>
          <p>
            about page {themeName ? 'with theme: ' + themeName : 'no theme'}
          </p>
        </div>
      </Layout>
    )
  }
}
About.propTypes = contextPropTypes

export default withProvider(withContext(About))
