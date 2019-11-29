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

    const keyid = this.form.getAttribute('keyid')

    let inputValues = {
      id: keyid == 'null' ? null : keyid
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
    const urlParsed = siteUrl.match(regex)

    this.elements.siteUrl = urlParsed ? urlParsed[0] : siteUrl
  }

}
