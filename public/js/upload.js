const uploadForm = document.getElementById('uploadForm')
const fileInput = document.getElementById("fileInput")
const uid = document.getElementById("uidInput")

if (uploadForm instanceof HTMLFormElement) {
    uploadForm.addEventListener('submit', e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', fileInput.files[0])
        fetch(`/api/users/${uid.value}/documents`, {
          method: 'POST',
          body: formData
        })
        .then(result => {
            if (result.status === 200) {
                window.location.replace('/login')
            }
        })
    })
}