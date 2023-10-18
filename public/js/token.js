const tokenForm = document.getElementById('tokenForm')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')

if (tokenForm instanceof HTMLFormElement) {
    tokenForm.addEventListener('submit', e => {
        e.preventDefault()
        const user = {
            email : emailInput.value,
            password : passwordInput.value
        }
        const token = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        fetch(`/api/users/${token} `, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            if (result.status === 200) {
                window.location.replace('/login')
            }
        })
    })
}