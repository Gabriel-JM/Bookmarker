"use strict"

// Imports
import FormManager from './Form/FormManager.js'
import FormActions from './Form/FormActions.js'
import HttpRequest from './HttpRequests/HttpRequest.js'
import MainUI from './UI/MainUI.js'

// Constants
const defaultUrl = 'http://localhost:3100'
const sitesListQuery = '[sites-list]'
const formQuery = '.insert-site-form'

// Objects
const http = new HttpRequest()
const formActions = new FormActions()
const mainUI = new MainUI()

// Event: Document Load
document.addEventListener('DOMContentLoaded', async () => {
	const result = await http.get(defaultUrl)

	if (result.length) {
		mainUI.showItems(sitesListQuery, result)

		formActions.addButtonsEvents()
	} else {
		mainUI.isSitesListEmpty(sitesListQuery)
	}
}, true)

// Event: Form submit
document.querySelector(formQuery).addEventListener('submit', event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)

	formActions.submitingFormValues(formManager)

	event.target.reset()
	event.target.setAttribute('keyid', null)

}, true)