const createProductForm = document.getElementById('createProductForm')
const titleInput = document.getElementById('titleInput')
const descriptionInput = document.getElementById('descriptionInput')
const priceInput = document.getElementById('priceInput')
const thumbnailInput = document.getElementById('thumbnailInput')
const codeInput = document.getElementById('codeInput')
const stockInput = document.getElementById('stockInput')
const btncreateProduct = document.getElementById('btnCreateProduct')

if (createProductForm instanceof HTMLFormElement) {
    btncreateProduct.addEventListener('click', (event) => {
        event.preventDefault()

        const product = new FormData()
        product.append('title', titleInput.value)
        product.append('description', descriptionInput.value)
        product.append('price', Number(priceInput.value))
        product.append('thumbnail', thumbnailInput.files[0])
        product.append('code', codeInput.value)
        product.append('stock', Number(stockInput.value))

        fetch('/api/products', {
            method: 'POST',
            body: product,
        })
            .then(result => {
                if (result.status === 201) {
                    window.location.replace('/products')
                }
            })
    })
}
