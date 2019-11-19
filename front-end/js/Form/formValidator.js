"use strict"

export default class FormValidator {

  verifyAll(validationObject, inputs) {

    return inputs.every(input => {
      return Object.keys(validationObject).every(attribute => {
        return input[attribute] === validationObject[attribute]
      })
    })

  }

}