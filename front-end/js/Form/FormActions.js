"use strict"

import MainUI from '../UI/MainUI.js'
import Messager from '../UI/Messager.js'
import HttpRequest from '../HttpRequests/HttpRequest.js'
import FormValidator from './FormValidator.js'

const defaultUrl = 'http://localhost:3100'
const sitesListQuery = '[sites-list]'
const formQuery = '.insert-site-form'

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

            this.addButtonsEvents()
            mainUI.isSitesListEmpty(sitesListQuery)
        }
        else {
            messager.showError(validaton)
        }

    }

}