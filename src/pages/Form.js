import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { contextPropTypes } from '../context'
import { css } from 'react-emotion'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import ThemeBlock from '../ThemeBlock'
import { form } from './Theme'

const errorStyles = css`
  margin-bottom: 1.33rem;

  > div {
    display: inline-block;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.33rem;
    font-size: 1.33rem;

    &.error {
      color: #cd0000;
      text-shadow: #dddddd 1px 1px 0;
    }
    &.success {
      color: #31a519;
      text-shadow: #cccccc 1px 1px 0;
    }
  }

  ul {
    margin: 0;
    list-style-type: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 0.33rem;
    padding-left: 0.33rem;
    border-left: 1.33rem #cd0000 solid;
  }

  a {
    color: black;
  }
`

const redText = css`
  display: block;
  color: #cd0000;
`

const ErrorList = ({ errors }) => (
  <div>
    <h2 className="error">error: you are bad at forms</h2>
    <ul>
      {errors.notEmpty ? (
        <li>
          <a href="#notEmpty">NOT EMPTY cannot be empty</a>
        </li>
      ) : (
        ''
      )}
      {errors.number ? (
        <li>
          <a href="#number">NUMBER must be a number</a>
        </li>
      ) : (
        ''
      )}
    </ul>
  </div>
)
ErrorList.propTypes = {
  errors: PropTypes.object.isRequired,
}

class Form extends Component {
  /*
  static class constants use the 'get' syntax in ES6 classes
  https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
  */
  static get fields() {
    return ['notEmpty', 'number']
  }

  static get redirect() {
    return '/values'
  }

  static validate(values) {
    let errors = {}
    if (!values.notEmpty) {
      errors.notEmpty = true
    }

    if (
      isNaN(values.number) ||
      isNaN(parseInt(values.number, 10)) // this one catches some edge cases (ie, booleans, empty strings)
    ) {
      errors.number = true
    }
    return errors
  }

  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)

    let {
      store: { form: { notEmpty = '', number = '' } = {} } = {},
    } = props.context

    let errors = null,
      success = null

    // only run this if there's a location.search
    // AND at least one of our fields exists in the string somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      props.location.search &&
      Form.fields.some(field => props.location.search.includes(field))
    ) {
      errors = Form.validate({ notEmpty, number })
      errors = Object.keys(errors).length ? errors : false
      success = !errors
    }

    this.state = {
      values: {
        notEmpty: errors && errors.notEmpty ? '' : notEmpty,
        number: errors && errors.number ? '' : number,
      },
      errors,
      success,
    }
  }

  handleInputChange(e) {
    let newValue = { [e.target.name]: e.target.value }
    this.setState(state => ({ values: { ...state.values, ...newValue } }))
  }

  render() {
    const { setStore } = this.props.context
    const { errors, success } = this.state

    return (
      <Layout>
        <Helmet>
          <title>FORM</title>
        </Helmet>

        <form className={form}>
          <ThemeBlock>
            <h1>form</h1>
          </ThemeBlock>
          <div
            id="submit-error"
            className={errorStyles}
            tabIndex="-1"
            ref={errorContainer => {
              this.errorContainer = errorContainer
            }}
          >
            {errors ? <ErrorList errors={errors} /> : ''}
            {success ? (
              <h2 className="success">Success! Form values saved!</h2>
            ) : (
              ''
            )}
          </div>

          <label>
            NOT EMPTY{' '}
            {errors && errors.notEmpty ? (
              <span className={redText}>cannot be empty</span>
            ) : (
              ''
            )}
            <input
              id="notEmpty"
              name="notEmpty"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.values.notEmpty}
            />
          </label>
          <label>
            NUMBER{' '}
            {errors && errors.number ? (
              <span className={redText}>must be a number</span>
            ) : (
              ''
            )}
            <input
              id="number"
              name="number"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.values.number}
            />
          </label>
          <button
            onClick={async e => {
              e.preventDefault()
              let errors = Form.validate(this.state.values)
              errors = Object.keys(errors).length ? errors : false
              await this.setState({ errors: errors, success: !errors })

              if (!errors) {
                await setStore(
                  this.props.match.path.slice(1),
                  this.state.values,
                )
                await this.props.history.push(Form.redirect)
              } else {
                this.errorContainer.focus()
              }
            }}
          >
            submit
          </button>
        </form>
        <p>
          will redirect to <Link to="/values">/values</Link> on a successful
          submit
        </p>
      </Layout>
    )
  }
}
Form.propTypes = {
  ...contextPropTypes,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withProvider(withContext(Form))
