export default {
  form: {
    fields: ['notEmpty', 'number'],
    validate: values => {
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
      return Object.keys(errors).length ? errors : false
    },
  },
  theme: {
    fields: ['themeName'],
    validate: values => {
      let errors = {}
      if (!['light', 'dark', 'monochrome'].includes(values.themeName)) {
        errors.themeName = true
      }
      return Object.keys(errors).length ? errors : false
    },
  },
}
