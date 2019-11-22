"use strict"

// Imports
import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'
import HttpRequest from './HttpRequests/HttpRequest.js'
import MainUI from './UI/MainUI.js'
import Messager from './UI/Message.js'

// Variables
const defaultUrl = 'http://localhost:3100'
const http = new HttpRequest()
const formValidator = new FormValidator()
const mainUI = new MainUI()
const messager = new Messager()

// Event: Document Load
document.addEventListener('DOMContentLoaded', async () => {
	const result = await http.get(defaultUrl)

	mainUI.showItems(result, '[sites-list]')

	addDeleting()
}, true)

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', async event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)

	const formPattern = {
		siteName: {
			maxLength: 30,
			disabled: false,
			required: true
		},
		siteUrl: {
			maxLength: 100,
			disabled: false,
			required: true
		}
	}

	const allFieldsValidation = formValidator.verifyFieldsWithPattern(formPattern, formManager.inputs)

	const spaceValidation = formManager.inputs.every(input => {
		return !formValidator.hasSpace(input.value)
	})

	if (allFieldsValidation && spaceValidation) {
		const result = await http.post(defaultUrl, formManager.elements)

		mainUI.addNewItem(result)

        addDeleting()
	} else {
		messager.showError('Ops...')
	}

}, true)

function addDeleting() {
	document.querySelectorAll('[btn-delete]').forEach(btn => {
		btn.addEventListener('click', async event => {
			const itemDiv = event.target.parentElement.parentElement
			const itemId = itemDiv.getAttribute('keyid')

			const result = await http.delete(`${defaultUrl}/${itemId}`)
			
			if(result.ok) {
				itemDiv.remove()
				messager.showSuccess(result.message)
			}
		})
	})
}