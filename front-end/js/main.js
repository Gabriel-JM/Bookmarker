"use strict"

// Imports
import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'
import HttpRequest from './HttpRequests/HttpRequest.js'
import MainUI from './UI/MainUI.js'
import Messager from './UI/Message.js'

// Constants
const defaultUrl = 'http://localhost:3100'
const sitesListDiv = '[sites-list]'
const http = new HttpRequest()
const formValidator = new FormValidator()
const mainUI = new MainUI()
const messager = new Messager()

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

// Event: Document Load
document.addEventListener('DOMContentLoaded', async () => {
	const result = await http.get(defaultUrl)

	if (result.length) {
		mainUI.showItems(result, sitesListDiv)

		addButtonsEvents()
	} else {
		isSitesListEmpty()
	}
}, true)

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', async event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)

	submitingFormValues(formManager)

	event.target.reset()

}, true)

function addButtonsEvents() {
	document.querySelectorAll('[btn-delete]').forEach(btn => {
		btn.addEventListener('click', async event => {
			const itemDiv = event.target.parentElement.parentElement
			const itemId = itemDiv.getAttribute('keyid')

			const result = await http.delete(`${defaultUrl}/${itemId}`)

			if (result.ok) {
				itemDiv.remove()
				messager.showSuccess(result.message)
				isSitesListEmpty()
			}
		})
	})

	document.querySelectorAll('[btn-edit]').forEach(btn => {
		btn.addEventListener('click', async event => {
			const itemDiv = event.target.parentElement.parentElement
			const itemId = itemDiv.getAttribute('keyid')

			const theOne = await http.get(`${defaultUrl}/${itemId}`)

			if (theOne && theOne.id) {
				mainUI.fillInputFields(theOne, '.insert-site-form')
			} else {
				mainUI.showError('Item not found!')
			}
		})
	})
}

function isSitesListEmpty() {
	const sitesList = document.querySelector(sitesListDiv)

	if (!sitesList.innerHTML) {
		mainUI.addNoItemsMessage(sitesListDiv)
	} else {
		mainUI.removeNoItemsMessage()
	}
}

function formValidation(form) {

	const allFieldsValidation = formValidator.verifyFieldsWithPattern(
		formPattern, form.inputs
	)

	const spaceValidation = form.inputs.every(input => {
		return !formValidator.hasSpace(input.value)
	})

	const urlValidation = true

	return allFieldsValidation && spaceValidation && urlValidation

}

async function submitingFormValues(form) {

	if (formValidation(form)) {
		const result = await http.post(defaultUrl, form.elements)

		messager.showSuccess('Added new item!')
		mainUI.addNewItem(result)

		addButtonsEvents()
		isSitesListEmpty()
	}
	else {
		messager.showError('Fill in the fields!')
	}

}