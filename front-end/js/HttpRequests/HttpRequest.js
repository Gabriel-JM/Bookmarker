"use strict"

export default class HttpRequest {

  async get(urlString) {
    try {
      const response = await fetch(urlString)

      const data = await response.json()

      return data

    } catch (error) {
      throw console.log(error)
    }
  }

  async post(urlString, bodyContent) {
    try {
      const response = await fetch(urlString, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
      })

      const data = await response.json()

      return data

    } catch (error) {
      throw console.log(error)
    }
  }

}