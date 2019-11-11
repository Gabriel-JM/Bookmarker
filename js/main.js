import FormManager from './Form/formManager.js'
import FormValidator from './Form/formValidator.js'

const formValidator = new FormValidator()

// Event: Form submit
document.querySelector('.insert-site-form').addEventListener('submit', event => {
	event.preventDefault()
	const formValues = new FormManager(event.target)
	const formLengthValidation = formValues.inputs.every(input => {
		return formValidator.verifyAll({ maxLength: 80, disabled: false }, input)
	})

	console.log(formLengthValidation)
})