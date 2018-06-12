import React, { Component } from 'react'
import { css } from 'react-emotion'

const about = css`
  font-size: 5em;
  color: red;
`

class About extends Component {
  render() {
    return <div className={about}>about</div>
  }
}

export default About
