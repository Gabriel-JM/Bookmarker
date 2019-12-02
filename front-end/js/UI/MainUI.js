"use strict"

import Messager from "./Messager.js"
import FormActions from "../Form/FormActions.js"

export default class MainUI {

    constructor() {
        this.messager = new Messager()
    }

    showItems(elementQuery, itemsArray = null) {

        if (itemsArray) this.itemsArray = itemsArray

        const containerElement = document.querySelector(elementQuery)

        containerElement.innerHTML = ''

        if (this.itemsArray) {
            const formActions = new FormActions()

            this.itemsArray.forEach(item => {
                containerElement.appendChild(this.createItemElement(item))
            })

            formActions.addButtonsEvents();
        }

    }

    showItem(item, elementQuery) {
        const containerElement = document.querySelector(elementQuery)

        containerElement.appendChild(item)
    }

    createItemElement(item) {
        const { id, siteName, siteUrl } = item
        const div = document.createElement('div')
        div.className = 'site-description-container'

        div.setAttribute('keyid', id)

        div.innerHTML = `
            <a href="http://${siteUrl}" target="_blank"
               rel="noopener noreferrer"
            >${siteName}</a>
            <div class="site-description-actions">
                <button btn-edit >Edit</button>
                <button btn-delete >Delete</button>
            </div>
        `

        return div
    }

    addNewItem(item) {
        const newItem = this.createItemElement(item)

        this.showItem(newItem, '[sites-list]')
    }

    fillInputFields(item, form) {
        const insertForm = document.querySelector(form)

        Object.keys(item).forEach(attribute => {
            const formField = insertForm[attribute]

            if (attribute !== 'id') {
                formField.value = item[attribute]
            } else {
                insertForm.setAttribute('keyid', item[attribute])
            }
        })

    }

    isSitesListEmpty(sitesListDiv) {
        const sitesList = document.querySelector(sitesListDiv)

        if (!sitesList.innerHTML) {
            this.messager.addNoItemsMessage(sitesListDiv)
        } else {
            this.messager.removeNoItemsMessage()
        }
    }

}