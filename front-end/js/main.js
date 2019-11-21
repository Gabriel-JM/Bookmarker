"use strict"

// Imports
import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'
import HttpRequest from './HttpRequests/HttpRequest.js'
import MainUI from './UI/MainUI.js'

// Variables
const defaultUrl = 'http://localhost:3100'
const http = new HttpRequest()
const formValidator = new FormValidator()
const mainUI = new MainUI()

// Event: Document Load
document.addEventListener('DOMContentLoaded', async () => {
	const result = await http.get(defaultUrl)

	mainUI.showItems(result, '[sites-list]')
}, true)

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', async event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)

	const allFieldsValidation = formValidator.verifyAll(
		{
			maxLength: 80,
			disabled: false
		},
		formManager.inputs
	)

	const spaceValidation = formManager.inputs.every(input => {
		return !formValidator.hasSpace(input.value)
	})

	if (allFieldsValidation && spaceValidation) {
		const result = await http.post(defaultUrl, formManager.elements)

		console.log(result)

	} else {
		console.log('Houve algum erro aí...')
	}
}, true)