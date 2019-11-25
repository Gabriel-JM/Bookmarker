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
            <p>${type == 'Error' ? '&#10007' : '&#10003'}</p>
            <div>
                <h4>${type == 'Error' ? 'Ops...' : type}</h4>
                <p>${message}</p>
            </div>
        `

        this.messageField.appendChild(div)

        this.addMessageVanishing()
    }

    addMessageVanishing() {
        document.querySelectorAll('.app-message').forEach(message => {
            message.addEventListener('animationend', () => {
                message.remove()
            })
        })
    }

}