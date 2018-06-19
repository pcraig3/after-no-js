import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie'
import Box from './Box'
import Layout from './Layout'

class About extends Component {
  render() {
    const { theme: { name } = {} } = this.props
    return (
      <Layout theme={this.props.theme || {}}>
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

function CacheLayer(WrappedComponent) {
  return class extends React.Component {
    static async getInitialProps(props) {
      props.res.cookie('theme', { name: 'light' })
      // props.req.cookies.theme_colour = 'light'

      const theme = { name: 'light' }
      return { theme }
    }

    constructor(props) {
      super(props)
      // Cookies.set('theme', {name: 'light'})

      let theme = Cookies.get('theme')
      theme =
        typeof theme === 'string' && theme.startsWith('j:')
          ? JSON.parse(theme.slice(2))
          : theme

      this.state = {
        theme: props.theme || theme,
      }
    }

    render() {
      return <WrappedComponent theme={this.state.theme} {...this.props} />
    }
  }
}

export default CacheLayer(About)
