import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'

const formValidator = new FormValidator()

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', event => {
	event.preventDefault()

	const formValues = new FormManager(event.target)
	const formValidation = formValues.inputs.every(input => {
		return formValidator.verifyAll({ maxLength: 80, disabled: false }, input)
	})

	if (formValidation) {
		fetch('http://localhost:3100', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues.elements)
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err))

	}
})