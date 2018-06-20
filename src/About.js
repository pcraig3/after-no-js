import React, { Component } from 'react'
import { css } from 'react-emotion'
import { Helmet } from 'react-helmet'
import Box from './Box'
import Layout from './Layout'

const about = css`
  font-size: 5em;
  color: #cd0000;
`

class About extends Component {
  static async getInitialProps({ req, res, match }) {
    const stuff = true
    return { stuff }
  }

  render() {
    return (
      <Layout>
        <div className={about}>
          <Helmet>
            <title>
              ABOUT - {this.props.stuff ? 'WITH STUFF' : 'NO STUFF'}
            </title>
          </Helmet>
          about {this.props.stuff ? 'with stuff' : 'no stuff'}
          <Box />
        </div>
      </Layout>
    )
  }
}

export default About
