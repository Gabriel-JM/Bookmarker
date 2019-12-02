"use strict"

// Imports
import MainUI from '../UI/MainUI.js'
import Messager from '../UI/Messager.js'
import HttpRequest from '../HttpRequests/HttpRequest.js'
import FormValidator from './FormValidator.js'

// Constants
const defaultUrl = 'http://localhost:3100'
const sitesListQuery = '[sites-list]'
const formQuery = '.insert-site-form'

// Objects
const http = new HttpRequest()
const mainUI = new MainUI()
const messager = new Messager()
const formValidator = new FormValidator()

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

formValidator.setFormPattern(formPattern)

export default class FormActions {

    constructor() {
        this.itemsList = []
    }

    async update() {
        const result = await http.get(defaultUrl)

        if (result.length) {
            this.itemsList = result
            mainUI.showItems(sitesListQuery, result)
            this.addButtonsEvents()
        } else {
            mainUI.isSitesListEmpty(sitesListQuery)
        }
    }

    addButtonsEvents() {
        const buttonsTypes = ['delete', 'edit']

        buttonsTypes.forEach(button => {

            document.querySelectorAll(`[btn-${button}]`).forEach(btn => {
                btn.addEventListener('click', async event => {
                    const itemDiv = event.target.parentElement.parentElement
                    const itemId = itemDiv.getAttribute('keyid')

                    if (button === 'delete') {
                        this.doDelete(itemDiv, itemId)
                    } else {
                        this.doEdit(itemId)
                    }
                })
            })

        })
    }

    async doEdit(itemId) {
        const theOne = await http.getOne(`${defaultUrl}`, itemId)

        if (theOne && theOne.id) {
            mainUI.fillInputFields(theOne, formQuery)
        } else {
            mainUI.showError('Item not found!')
        }
    }

    async doDelete(itemDiv, itemId) {
        const result = await http.delete(`${defaultUrl}`, itemId)

        if (result.ok) {
            itemDiv.remove()
            messager.showSuccess(result.message)
            mainUI.isSitesListEmpty(sitesListQuery)
            this.update()
        }
    }

    async submitingFormValues(form) {
        const { id } = form.elements
        const validaton = formValidator.validateForm(form)

        if (validaton === 'ok') {

            if (!id) {
                const result = await http.post(defaultUrl, form.elements)

                messager.showSuccess('Added new item!')
                mainUI.addNewItem(result)
            } else {
                const result = await http.put(defaultUrl, form.elements)

                messager.showSuccess('Item edited!')
                mainUI.showItems(sitesListQuery, result)
            }

            this.update()
            mainUI.isSitesListEmpty(sitesListQuery)
        }
        else {
            messager.showError(validaton)
        }

    }

    search(inputValue) {

        const { itemsList } = this

        if(!RegExp(/^\s+$|\s+(?=\s{1,2})/).test(inputValue)) {
            const result = itemsList.filter(item => {
                return RegExp(inputValue.toLowerCase()).test(item.siteName.toLowerCase())
            })

            if(!result.length && inputValue !== '') {
                mainUI.removeList(sitesListQuery)
                messager.addNoItemsMessage(sitesListQuery)
            } else if(inputValue === '') {
                mainUI.showItems(sitesListQuery, itemsList)
            } else {
                mainUI.showItems(sitesListQuery, result)
                messager.removeNoItemsMessage()
            }
        }

    }

}