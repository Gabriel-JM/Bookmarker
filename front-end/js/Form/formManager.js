"use strict"

export default class FormManager {

  constructor(form) {
    this.form = form;
    this.inputs = this.getInputs()
    this.elements = this.getInputValues()
    this.parseUrl()
  }

  getInputs() {
    return Array.from(this.form.elements).filter(
      element => element.nodeName === 'INPUT'
    )
  }

  getInputValues() {
    const inputArray = this.getInputs()

    let inputValues = {
      id: this.form.getAttribute('keyid')
    }

    for (let input of inputArray) {
      Object.assign(inputValues, {
        [input.name]: input.value
      })
    }

    return inputValues
  }

  parseUrl() {
    const regex = /[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    const { siteUrl } = this.elements

    this.elements.siteUrl = siteUrl.match(regex)
  }

}
