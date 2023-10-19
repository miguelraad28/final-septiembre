
const btnEditar = document.getElementById('btnEditar')

if(btnEditar){
    btnEditar.addEventListener("click", () => {
    const idProducto = btnEditar.getAttribute('data-product-id')
    window.location.replace(`/products/${idProducto}/edit`)
    })
}




const btnDelete = document.getElementById('btnEliminar')

if(btnDelete){
    btnDelete.addEventListener("click", () => {
    fetch(`/api/products/${btnDelete.getAttribute('data-product-id')}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => {
        if (result.status === 200) {
            window.location.replace('/products')
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud DELETE:', error)
    })
})
}





const editProductForm = document.getElementById('editProductForm')
const btnPutEdited = document.getElementById('btnPutEditedProduct')
editProductForm?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const method = editProductForm.querySelector('input[name="_method"]').value;
    const url = editProductForm.getAttribute('action');
    const formData = new FormData(editProductForm);
    try {
        const response = await fetch(url, {
            method: method,
            body: formData,
        })
        if (response.ok) {
            const productId = url.substring(url.lastIndexOf('/') + 1)
            window.location.replace(`/products/detail/${productId}`)
        } else {
            // TODO
            console.error('Error en la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        // TODO
        console.error(error);
    }
})

