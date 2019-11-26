"use strict"

export default class FormValidator {

  setFormPattern(pattern) {
    this.formPattern = pattern
  }

  verifyAll(validationObject, inputs) {

    return inputs.every(input => {
      return Object.keys(validationObject).every(attribute => {
        return input[attribute] === validationObject[attribute]
      })
    })

  }

  verify(validationObject, input) {

    return Object.keys(validationObject).every(attribute => {
      return input[attribute] === validationObject[attribute]
    })

  }

  verifyFieldsWithPattern(validationObject, inputs) {

    return Object.keys(validationObject).every(field => {
      const input = inputs.find(input => input.name === field)

      return Object.keys(validationObject[field]).every(attribute => {
        const validationField = validationObject[field]

        return input[attribute] === validationField[attribute]
      })
    })

  }

  validateUrl(url) {
    const regex = /[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    return RegExp(regex).test(url)
  }

  hasSpace(value) {

    const expression = /^\s*$|\s+(?=[^a-zá-úà-ù])/i

    return RegExp(expression).test(value)

  }

  validateForm(form) {

    let result = 'ok'

    const allFieldsValidation = this.verifyFieldsWithPattern(
      this.formPattern, form.inputs
    )

    const spaceValidation = form.inputs.every(input => {
      return !this.hasSpace(input.value)
    })

    const urlValidation = this.validateUrl(form.elements.siteUrl)

    if (!urlValidation) result = 'Invalid Url!'

    if (!allFieldsValidation) result = "Don't do that!"

    if (!spaceValidation) result = 'Invalid input!'

    return result

  }

}