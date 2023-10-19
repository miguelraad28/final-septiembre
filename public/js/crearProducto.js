// const createProductForm = document.getElementById('createProductForm')
// const titleInput = document.getElementById('titleInput')
// const descriptionInput = document.getElementById('descriptionInput')
// const priceInput = document.getElementById('priceInput')
// const thumbnailInput = document.getElementById('thumbnailInput')
// const codeInput = document.getElementById('codeInput')
// const stockInput = document.getElementById('stockInput')
// const btncreateProduct = document.getElementById('btnCreateProduct')

// if (createProductForm instanceof HTMLFormElement) {
//     btncreateProduct.addEventListener('click', () => {
//         const product = {
//             title : titleInput.value,
//             description : descriptionInput.value,
//             price : Number(priceInput.value),
//             thumbnail : thumbnailInput.value,
//             code : codeInput.value,
//             stock : Number(stockInput.value),
//         }
//         fetch('/api/products', {
//             method: 'POST',
//             body: JSON.stringify(product),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(result => {
//             if (result.status === 201) {
//                 window.location.replace('/products')
//             }
//         })
//     })
// }

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
        event.preventDefault() // Evitar que el formulario se envíe por defecto

        const product = new FormData() // Usar FormData en lugar de objeto literal
        product.append('title', titleInput.value);
        product.append('description', descriptionInput.value);
        product.append('price', Number(priceInput.value));
        product.append('thumbnail', thumbnailInput.files[0]); // Agregar la imagen al FormData
        product.append('code', codeInput.value);
        product.append('stock', Number(stockInput.value));

        fetch('/api/products', {
            method: 'POST',
            body: product,
        })
            .then(result => {
                if (result.status === 201) {
                    window.location.replace('/products');
                }
            });
    });
}
