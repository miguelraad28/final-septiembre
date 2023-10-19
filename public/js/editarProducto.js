
const btnEditar = document.querySelectorAll('.btnEditar')


btnEditar?.forEach((btn) => {
    btn.addEventListener("click", () => {
        const idProducto = btn.getAttribute('data-product-id')
        window.location.replace(`/products/${idProducto}/edit`)
    })
})

const btnDelete = document.querySelectorAll('.btnDelete')

btnDelete?.forEach((btn) => {
    btn.addEventListener("click", () => {
        fetch(`/api/products/${btn.getAttribute('data-product-id')}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            if (result.status === 200) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud DELETE:', error);
        });
    });
});







const editProductForm = document.getElementById('editProductForm');
const btnPutEdited = document.getElementById('btnPutEditedProduct');
editProductForm?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const method = editProductForm.querySelector('input[name="_method"]').value;
    const url = editProductForm.getAttribute('action');
    const formData = new FormData(editProductForm);
    try {
        const response = await fetch(url, {
            method: method,
            body: formData,
        });
        if (response.ok) {
            const productId = url.substring(url.lastIndexOf('/') + 1); // Obtener el ID del producto de la URL
            window.location.replace(`/products/${productId}`);
        } else {
            // TODO
            console.error('Error en la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        // TODO
        console.error(error);
    }
});

