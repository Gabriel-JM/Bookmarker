"use strict"

export default class HttpRequest {

    async get(urlString) {
        return this.makeRequest(urlString, 'GET')
    }

    async getOne(urlString, id) {
        const url = `${urlString}/?id=${id}`

        return this.makeRequest(url, 'GET')
    }

    async post(urlString, bodyContent) {
        return this.makeRequest(urlString, 'POST', bodyContent)
    }

    async put(urlString, bodyContent) {
        const { id } = bodyContent
        const url = `${urlString}/?id=${id}`

        return this.makeRequest(url, 'PUT', bodyContent)
    }

    async delete(urlString, id) {
        const url = `${urlString}/?id=${id}`

        return this.makeRequest(url, 'DELETE')
    }

    async makeRequest(urlString, method, bodyContent = null) {

        const headersConfig = {
            method,
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        if(bodyContent) Object.assign(headersConfig, {
            body: JSON.stringify(bodyContent)
        })

        try {
            const response = await fetch(urlString, headersConfig)

            const data = response.json()

            return data

        } catch(error) {
            throw console.log(error)
        }
    }

}