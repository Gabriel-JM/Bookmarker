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

  hasSpace(value) {

    const expression = /^\s*$|\s+(?=[^a-zá-úà-ù])/i

    return RegExp(expression).test(value)

  }

}