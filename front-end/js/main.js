import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'
import HttpRequest from './HttpRequests/HttpRequest.js'

const formValidator = new FormValidator()
const defaultUrl = 'http://localhost:3100'

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', event => {
	event.preventDefault()

	const formManager = new FormManager(event.target)
	const allFormsValidation = formValidator.verifyAll({ maxLength: 80, disabled: false }, formManager.inputs)

	if (allFormsValidation) {
		// fetch('http://localhost:3100', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(formValues.elements)
		// })
		// 	.then(res => res.json())
		// 	.then(data => console.log(data))
		// 	.catch(err => console.log(err))

		const http = new HttpRequest()

		http.get(defaultUrl)

	}
})