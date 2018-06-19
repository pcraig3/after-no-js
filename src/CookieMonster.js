import React, { Component } from 'react'
import Cookies from 'js-cookie'

function CookieMonster(WrappedComponent) {
  return class extends Component {
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

      // JSON cookie values come back like 'j:{"name":"light"}'
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

export default CookieMonster
