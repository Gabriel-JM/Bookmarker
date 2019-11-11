export default class FormValidator {
  verifyAll(validationObject, input) {
    return Object.keys(validationObject).every(attribute => {
      return input[attribute] === validationObject[attribute]
    })
  }
}