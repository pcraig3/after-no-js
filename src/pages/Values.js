import React, { Component } from 'react'
import { contextPropTypes } from '../context'
import { Helmet } from 'react-helmet'
import withProvider from '../withProvider'
import withContext from '../withContext'
import ThemeBlock from '../ThemeBlock'
import Layout from '../Layout'

class Values extends Component {
  render() {
    let { context: { store } = {} } = this.props
    return (
      <Layout>
        <div>
          <Helmet>
            <title>VALUES</title>
          </Helmet>
          <ThemeBlock>
            <h1>values</h1>
          </ThemeBlock>

          <p>App-wide stored values</p>
          <hr />
          <pre>{JSON.stringify({ store: store }, null, 2)}</pre>
          <hr />
          <p>
            <a href="/clear">clear cookies</a>
          </p>
        </div>
      </Layout>
    )
  }
}
Values.propTypes = contextPropTypes

export default withProvider(withContext(Values))
