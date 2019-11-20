"use strict"

export default class MainUI {

  showItems(itemsArray, elementQuery) {
    const containerElement = document.querySelector(elementQuery)

    itemsArray.forEach(item => {
      containerElement.appendChild(this.createItemElement(item))
    })

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
          <button>Edit</button>
          <button>Delete</button>
      </div>`

    return div
  }

}