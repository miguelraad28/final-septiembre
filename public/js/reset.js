const resetForm = document.getElementById('resetForm')
const emailInput = document.getElementById('emailInput')

if (resetForm instanceof HTMLFormElement) {
    resetForm.addEventListener('submit', e => {
        e.preventDefault()
        const user = {
            email : emailInput.value,
        }
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

