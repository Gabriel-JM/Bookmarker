"use strict"

export default class Messager {

    constructor() {
        this.messageField = document.querySelector('[message-field]')
    }

    showSuccess(message) {
        this.createMessage(message, 'Success')
    }

    showError(message) {
        this.createMessage(message, 'Error')
    }

    createMessage(message, type) {
        const div = document.createElement('div')

        div.className = `app-message ${type.toLowerCase()}-message`

        div.innerHTML = `
            <h4>${type}</h4>
            <p>${message}</p>`

        this.messageField.appendChild(div)
    }

}