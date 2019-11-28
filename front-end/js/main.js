"use strict"

// Imports
import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'
import HttpRequest from './HttpRequests/HttpRequest.js'
import MainUI from './UI/MainUI.js'
import Messager from './UI/Messager.js'

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
		mainUI.showItems(sitesListDiv, result)

		addButtonsEvents()
	} else {
		mainUI.isSitesListEmpty(sitesListDiv)
	}
}, true)

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', async event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)
	const { id } = formManager.elements

	const isNewItem = (id == 'null')

	submitingFormValues(formManager, isNewItem)

	event.target.reset()
	event.target.setAttribute('keyid', null)

}, true)

function addButtonsEvents() {

	const buttonsTypes = ['delete', 'edit']

	buttonsTypes.forEach(button => {

		document.querySelectorAll(`[btn-${button}]`).forEach(btn => {
			btn.addEventListener('click', async event => {
				const itemDiv = event.target.parentElement.parentElement
				const itemId = itemDiv.getAttribute('keyid')

				if (button === 'delete') {
					doDelete(itemDiv, itemId)
				} else {
					doEdit(itemId)
				}
			})
		})

	})
}

async function doEdit(itemId) {
	const theOne = await http.getOne(`${defaultUrl}`, itemId)

	if (theOne && theOne.id) {
		mainUI.fillInputFields(theOne, '.insert-site-form')
	} else {
		mainUI.showError('Item not found!')
	}
}

async function doDelete(itemDiv, itemId) {
	const result = await http.delete(`${defaultUrl}`, itemId)

	if (result.ok) {
		itemDiv.remove()
		messager.showSuccess(result.message)
		mainUI.isSitesListEmpty(sitesListDiv)
	}
}

async function submitingFormValues(form, isNewItem) {

	formValidator.setFormPattern(formPattern)

	const validaton = formValidator.validateForm(form)

	if (validaton === 'ok') {

		if (isNewItem) {
			const result = await http.post(defaultUrl, form.elements)

			messager.showSuccess('Added new item!')
			mainUI.addNewItem(result)
		} else {
			const result = await http.put(defaultUrl, form.elements)

			messager.showSuccess('Item edited!')
			mainUI.showItems(sitesListDiv, result)
		}

		addButtonsEvents()
		mainUI.isSitesListEmpty(sitesListDiv)
	}
	else {
		messager.showError(validaton)
	}

}