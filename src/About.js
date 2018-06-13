import React, { Component } from 'react'
import { css } from 'react-emotion'
import { Helmet } from 'react-helmet'

const about = css`
  font-size: 5em;
  color: red;
`

class About extends Component {
  static async getInitialProps({ req, res, match }) {
    const stuff = true
    return { stuff }
  }

  render() {
    return (
      <div className={about}>
        <Helmet>
          <title>ABOUT - {this.props.stuff ? 'WITH STUFF' : 'NO STUFF'}</title>
        </Helmet>
        about {this.props.stuff ? 'with stuff' : 'no stuff'}
      </div>
    )
  }
}

export default About
