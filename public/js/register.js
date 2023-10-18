const registerForm = document.getElementById('registerForm')
const firstNameInput = document.getElementById('firstNameInput')
const lastNameInput = document.getElementById('lastNameInput')
const emailInput = document.getElementById('emailInput')
const ageInput = document.getElementById('ageInput')
const passwordInput = document.getElementById('passwordInput')

if (registerForm instanceof HTMLFormElement) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault()
        const user = {
            firstName : firstNameInput.value,
            lastName : lastNameInput.value,
            email : emailInput.value,
            age : Number(ageInput.value),
            password : passwordInput.value,
            rol : "user"
        }
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            if (result.status === 201) {
                window.location.replace('/login')
            }
        })
    })
}

