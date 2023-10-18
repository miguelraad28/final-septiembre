
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
    })
})





const editProductForm = document.getElementById('editProductForm')
const titleInput = document.getElementById('titleInput')
const descriptionInput = document.getElementById('descriptionInput')
const priceInput = document.getElementById('priceInput')
const thumbnailInput = document.getElementById('thumbnailInput')
const codeInput = document.getElementById('codeInput')
const stockInput = document.getElementById('stockInput')
const btnPutEdited = document.getElementById("btnPutEditedProduct")

    btnPutEdited?.addEventListener('click', async () => {
        const product = {
            title : titleInput.value,
            description : descriptionInput.value,
            price : Number(priceInput.value),
            thumbnail : thumbnailInput.value,
            code : codeInput.value,
            stock : Number(stockInput.value),
        }
        fetch(`/api/products/${btnPutEdited.getAttribute('data-product-id')}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })


