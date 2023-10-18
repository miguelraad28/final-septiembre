const btnForm = document.getElementById('btnForm')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')


    btnForm.addEventListener('click', e => {
        e.preventDefault()
        const obj = {
            email: emailInput.value,
            password: passwordInput.value
        };
        fetch('/api/sessions/', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                if (result.status === 201) {
                    window.location.replace('/products')
                }
            })
    })
