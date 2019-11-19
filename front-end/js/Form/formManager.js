"use strict"

export default class FormManager {

  constructor(form) {
    this.form = form;
    this.inputs = this.getInputs()
    this.elements = this.getInputValues()
  }

  getInputs() {
    return Array.from(this.form.elements).filter(
      element => element.nodeName === 'INPUT'
    )
  }

  getInputValues() {
    const inputArray = this.getInputs()

    let inputValues = {}

    for (let input of inputArray) {
      Object.assign(inputValues, {
        [input.name]: input.value
      })
    }

    return inputValues
  }

}
