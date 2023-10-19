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
    console.error('Error al realizar la solicitud DELETE:', error);
  })
})