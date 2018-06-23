import React, { Component } from 'react'
import { css } from 'react-emotion'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import ThemeBlock from '../ThemeBlock'

const home = css`
  ul {
    list-style-type: none;
  }
`

const Check = () => (
  <span role="img" aria-label="white check mark">
    ✅
  </span>
)

class Home extends Component {
  render() {
    return (
      <Layout>
        <div className={home}>
          <div>
            <ThemeBlock>
              <h1>After.js w/ React context and browser cookies</h1>
            </ThemeBlock>
          </div>
          <p>JS-agnostic proof-of-concept app.</p>
          <p>Able to:</p>
          <ul>
            {[
              'save form values to global state in a fairly generic way between pages',
              'easily do form validation stuff (validation logic, on-screen errors, etc.)',
              'preserve your `this.state` even after doing a hard refresh',
              'turn JS on or off at any point in the flow without losing data',
              'wow your friends',
            ].map((v, i) => (
              <li key={i}>
                <Check /> {v}
              </li>
            ))}
          </ul>
          <p>Still checking out:</p>
          <ul>
            <li>
              <span role="img" aria-label="thinking face">
                🤔
              </span>{' '}
              is it possible to redirect after a successful submit without JS?
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default withProvider(withContext(Home))
