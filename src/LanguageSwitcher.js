import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withContext from './withContext'
import { contextPropTypes } from './context'

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props)
    this.getNewLanguage = this.getNewLanguage.bind(this)

    let { context: { store: { language = '' } = {} } = {} } = props

    this.state = {
      language,
    }
  }

  getNewLanguage() {
    return this.state.language === 'en' ? 'fr' : 'en'
  }

  render() {
    let { context: { setStore } = {} } = this.props

    return (
      <form>
        <span>language: {this.state.language || 'none'}</span>
        <input
          id="language-id"
          name="language"
          type="hidden"
          value={this.getNewLanguage()}
        />
        <button
          onClick={e => {
            e.preventDefault()
            this.setState({ language: this.getNewLanguage() }, () =>
              setStore('language', this.state.language),
            )
          }}
        >
          change to {this.getNewLanguage()}
        </button>
      </form>
    )
  }
}
LanguageSwitcher.propTypes = {
  ...contextPropTypes,
  children: PropTypes.any,
}

export default withContext(LanguageSwitcher)
