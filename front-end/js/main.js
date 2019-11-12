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

	if(formValidation) {
		localStorage.setItem('bookMaker', JSON.stringify(formValues.elements));
		console.log(localStorage)
	}
})

function call() {
	fetch('http://localhost:3100/', {
		method: 'GET',
		headers: {
			'Content-Type':'application/json'
		},
		mode: 'no-cors'
	}).then(res => {
		if(!res.ok) {
			throw Error(res.statusText)
		}

		return res.json()
	})
	.catch(err => console.log(err))
}

call()