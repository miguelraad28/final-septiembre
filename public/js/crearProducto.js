const createProductForm = document.getElementById('createProductForm')
const titleInput = document.getElementById('titleInput')
const descriptionInput = document.getElementById('descriptionInput')
const priceInput = document.getElementById('priceInput')
const thumbnailInput = document.getElementById('thumbnailInput')
const codeInput = document.getElementById('codeInput')
const stockInput = document.getElementById('stockInput')
const btncreateProduct = document.getElementById('btnCreateProduct')

if (createProductForm instanceof HTMLFormElement) {
    btncreateProduct.addEventListener('click', () => {
        const product = {
            title : titleInput.value,
            description : descriptionInput.value,
            price : Number(priceInput.value),
            thumbnail : thumbnailInput.value,
            code : codeInput.value,
            stock : Number(stockInput.value),
        }
        fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
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
}

