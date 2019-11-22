"use strict"

export default class MainUI {

    showItems(itemsArray, elementQuery) {
        const containerElement = document.querySelector(elementQuery)

        containerElement.innerHTML = ''

        itemsArray.forEach(item => {
            containerElement.appendChild(this.createItemElement(item))
        })

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

}