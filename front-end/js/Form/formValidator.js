"use strict"

export default class FormValidator {

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

  hasSpace(value) {

    const expression = /^\s*$|\s+(?=[^a-zá-úà-ù])/i

    return RegExp(expression).test(value)

  }

}