import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import { css } from 'react-emotion'
import withProvider from '../withProvider'
import withContext from '../withContext'
import Layout from '../Layout'
import Box from '../Box'
import { form } from './Form'

const errorStyles = css`
  margin-bottom: 1.33rem;

  > div {
    display: inline-block;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.33rem;
    font-size: 1.33rem;
    color: #cd0000;
    text-shadow: #dddddd 1px 1px 0;
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

const validate = values => {
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
  return Object.keys(errors).length ? errors : null
}

const errorList = errors => (
  <div>
    <h2>error: you are bad at forms</h2>
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

class Validation extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)

    let {
      store: { validation: { notEmpty = '', number = '' } = {} } = {},
    } = props.context

    let errors = null

    // only run this if there's a location.search so that
    // we know for sure they pressed "submit"
    if (props.location.search) {
      errors = validate({ notEmpty, number })
    }

    this.state = {
      values: {
        notEmpty: errors && errors.notEmpty ? '' : notEmpty,
        number: errors && errors.number ? '' : number,
      },
      errors,
    }
  }

  handleInputChange(e) {
    let newValue = { [e.target.name]: e.target.value }
    this.setState(state => ({ values: { ...state.values, ...newValue } }))
  }

  render() {
    const { setStore } = this.props.context
    const { errors } = this.state

    return (
      <Layout>
        <form className={form}>
          <Box>
            <h1>validation</h1>
          </Box>
          <div
            id="submit-error"
            className={errorStyles}
            tabIndex="-1"
            ref={errorContainer => {
              this.errorContainer = errorContainer
            }}
          >
            {errors ? errorList(errors) : ''}
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
            onClick={e => {
              e.preventDefault()
              let errors = validate(this.state.values)
              this.setState({ errors: errors })

              if (!errors) {
                setStore(this.props.match.path.slice(1), this.state.values)
              } else {
                this.errorContainer.focus()
              }
            }}
          >
            submit
          </button>
        </form>
      </Layout>
    )
  }
}
Validation.propTypes = {
  ...contextPropTypes,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withProvider(withContext(Validation))
