"use strict"

// Imports
import FormManager from './Form/FormManager.js'
import FormActions from './Form/FormActions.js'
import Searcher from './Searcher/Searcher.js'

// Constants
const formQuery = '.insert-site-form'
const searchInputQuery = '.search-input'

// Objects
const formActions = new FormActions()
const searcher = new Searcher()

// Event: Document Load
document.addEventListener('DOMContentLoaded', () => {
	formActions.init()
}, true)

// Event: Form submit
document.querySelector(formQuery).addEventListener('submit', event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)

	formActions.submitingFormValues(formManager)

	event.target.reset()
	event.target.setAttribute('keyid', null)

}, true)

// Event: Site search
document.querySelector(searchInputQuery).addEventListener('input', event => {
	searcher.search(event.target.value, formActions.itemsList)
})