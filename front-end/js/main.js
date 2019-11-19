"use strict"

import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'
import HttpRequest from './HttpRequests/HttpRequest.js'

const defaultUrl = 'http://localhost:3100'

const http = new HttpRequest()
const formValidator = new FormValidator()


// Event: Document Load
document.addEventListener('DOMContentLoaded', async () => {
	const result = await http.get(defaultUrl)

	console.log(result)
}, true)

// Event: Form submit
document.querySelector('.insert-site-form')
	.addEventListener('submit', async event => {
		event.preventDefault()

		const formManager = new FormManager(event.target)
		const allFormsValidation = formValidator.verifyAll({ maxLength: 80, disabled: false }, formManager.inputs)

		if (allFormsValidation) {
			const result = await http.post(defaultUrl, formManager.elements)

			console.log(result)

		} else {
			console.log('Houve algum erro aí...')
		}
	}, true)