const btnDeleteUsers = document.getElementById("btnDeleteUsers")

btnDeleteUsers.addEventListener("click", () => {
  fetch('/api/users/twodays', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(result => {
    if (result.status === 200) {
      window.location.reload();
    }
  })
  .catch(error => {
    console.error('Error al realizar la solicitud DELETE:', error)
  })
})


const btnModify = document.querySelectorAll('.btn-outline-warning')
const btnDelete = document.querySelectorAll('.btn-outline-danger')
    btnModify.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const userId = event.target.dataset.userId;
            fetch(`/api/users/rol/${userId}`, {
                method: 'PUT',
            })
            .then((response) => {
                if (response.ok) {
                  window.location.reload()
                } else {
                  //todo
                }
            })
            .catch((error) => {
                // Todo
                console.error('Error:', error)
            })
        })
    })

    btnDelete.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const userId = event.target.dataset.userId
            fetch(`/api/users/delete/${userId}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    // Todo
                } else {
                    // Todo
                }
            })
            .catch((error) => {
                // Todo
                console.error('Error:', error)
            })
        })
    })

