const restablecerForm = document.getElementById('restablecerForm')
const emailInput = document.getElementById('emailInput')

if (restablecerForm instanceof HTMLFormElement) {
    restablecerForm.addEventListener('submit', e => {
        e.preventDefault()
        const user = {
            email : emailInput.value,
        }
        console.log(user)
        fetch('/api/token ', {
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

