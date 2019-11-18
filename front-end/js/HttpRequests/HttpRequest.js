export default class HttpRequest {

  async get(urlString) {
    const response = await fetch(urlString)

    const data = await response.json()

    console.log(data)
  }

}