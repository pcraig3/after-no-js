import withProvider from '../withProvider'

class FakeComponentEmpty {
  constructor() {}
}

describe('WithProvider', () => {
  describe('.globalFields and .validate()', () => {
    const WithProvider = withProvider(FakeComponentEmpty)

    it('has only "language" as a global field', () => {
      expect(WithProvider.globalFields).toEqual(['language'])
    })

    it('returns no errors for "en" or "fr" in its validation method', () => {
      let errors
      errors = WithProvider.validate({ language: 'en' })
      expect(errors).toBe(false)

      errors = WithProvider.validate({ language: 'fr' })
      expect(errors).toBe(false)
    })

    it('returns errors for some other value in its validation method', () => {
      let errors
      errors = WithProvider.validate({ language: 'portuguese' })
      expect(errors).toEqual({ language: true })
    })
  })

  describe('.validateCookie() with global field', () => {
    const WithProvider = withProvider(FakeComponentEmpty)

    // static validateCookie(key, val = null, fields = [], validate = null)
    it('returns correct language for "en"', () => {
      let result = WithProvider.validateCookie('language', 'en')
      expect(result).toEqual('en')
    })

    it('returns correct language for "fr"', () => {
      let result = WithProvider.validateCookie('language', 'fr')
      expect(result).toEqual('fr')
    })

    it('returns false for different language', () => {
      let result = WithProvider.validateCookie('language', 'portuguese')
      expect(result).toBe(false)
    })

    let invalidVals = [0, false, { language: 'en' }, ['en'], null, '']
    invalidVals.map(v => {
      it(`throws error for global field with a non-empty string value: ${v}`, () => {
        expect(() => {
          WithProvider.validateCookie('language', v)
        }).toThrowError(/^validate: `val` must be a non-empty string$/)
      })
    })
  })

  describe('.validateCookie() with regular field', () => {
    describe('WrappedComponent without `fields` and `validate`', () => {
      class FakeComponentWithFields {
        static get fields() {
          return ['field']
        }
      }

      class FakeComponentWithValidate {
        static validate(values) {
          let errors = {}
          if (!values.field !== 'value') {
            errors.field = true
          }
          return Object.keys(errors).length ? errors : false
        }
        constructor() {}
      }

      const EmptyWithProvider = withProvider(FakeComponentEmpty)
      const WithProviderFields = withProvider(FakeComponentWithFields)
      const WithProviderValidate = withProvider(FakeComponentWithValidate)

      it('returns false if WrappedComponent does not have `fields` or `validate`', () => {
        let result = EmptyWithProvider.validateCookie('field', 'value')
        expect(result).toBe(false)
      })

      it('returns false if WrappedComponent does not have `validate`', () => {
        let result = WithProviderFields.validateCookie('field', 'value')
        expect(result).toBe(false)
      })

      it('returns false if WrappedComponent does not have `fields`', () => {
        let result = WithProviderValidate.validateCookie('field', 'value')
        expect(result).toBe(false)
      })
    })

    describe('WrappedComponent has `fields` and `validate`', () => {
      class FakeComponentWithFieldsAndValidate {
        static get fields() {
          return ['field']
        }
        static validate(values) {
          let errors = {}
          if (values.field !== 'value') {
            errors.field = true
          }
          return Object.keys(errors).length ? errors : false
        }
        constructor() {}
      }

      const WithProvider = withProvider(FakeComponentWithFieldsAndValidate)

      it('returns original object when validation passes', () => {
        let result = WithProvider.validateCookie('page', { field: 'value' })
        expect(result).toEqual({ field: 'value' })
      })

      let invalidVals = [0, false, {}, ['value'], null, '', 'value']
      invalidVals.map(v => {
        it(`throws error for regular field with a non-empty object value: ${v}`, () => {
          expect(() => {
            WithProvider.validateCookie('page', v)
          }).toThrowError(/^validate: `val` must be a non-empty object$/)
        })
      })

      it('removes invalid keys from original object', () => {
        let result = WithProvider.validateCookie('page', {
          field: 'value',
          field2: 'value2',
        })
        expect(result).toEqual({ field: 'value' })
      })

      it('sets value to an empty string when key is valid but value is invalid', () => {
        let result = WithProvider.validateCookie('page', {
          field: 'wrong value',
        })
        expect(result).toEqual({ field: '' })
      })

      it('does not mutate original object', () => {
        // original object has too many keys
        let val1 = { field: 'value', field2: 'value2' }
        let result1 = WithProvider.validateCookie('page', val1)
        expect(result1).toEqual({ field: 'value' })
        //check that the keys are still there
        expect(val1).toEqual({ field: 'value', field2: 'value2' })

        // original object has invalid value
        let val2 = { field: 'wrong value' }
        let result2 = WithProvider.validateCookie('page', val2)
        expect(result2).toEqual({ field: '' })
        // check that the original value is still there
        expect(val2).toEqual({ field: 'wrong value' })
      })
    })
  })
})
