import { ForbiddenError } from '../../errors/errors.js';
import createProductsMock from '../../mocks/productoMock.js';
import { Product } from '../../models/Product.js'
import { productRepository, userRepository } from '../../repositories/index.js';
import { mailer } from '../../utils/mailer.js';
import { deleteProductMessage } from '../../utils/mensajesMailer.js';

export async function productsGetController(req, res, next) {

    try {
        let criteria = {}
        for (let key in req.query) {
            if (key === 'title' || key === 'description' || key === 'price' || key === 'stock') {
                criteria = { ...criteria, [key]: req.query[key] };
            }
        }
        const optionsPagination = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            lean: true,
        }
        if (req.query.sort === 'asc') {
            optionsPagination.sort = { price: 1 }
        } else if (req.query.sort === 'desc') {
            optionsPagination.sort = { price: -1 }
        }
        const products = await productRepository.paginate(criteria, optionsPagination)
        res.status(200).json(products)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function productsGetOneController(req, res, next) {
    try {
        const product = await productRepository.read({ _id: req.params.pid })
        res.status(200).json(product)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function productsPostController(req, res, next) {
    try {
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            thumbnail: req.file.filename,
            code: req.body.code,
            stock: Number(req.body.stock),
            owner: req.user._id || "admin"
        })
        await productRepository.registrar(product)
        res.status(201).redirect('/profile')
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
        next(error);
    }
}

export async function mockProductsPostController(req, res, next) {
    try {
        const registeredProducts = []
        for (let i = 0; i < 100; i++) {
            const product = createProductsMock()
            const registredProduct = await productRepository.registrar(product)
            registeredProducts.push(registredProduct)
        }
        res.status(201).json(registeredProducts)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function productsPutController(req, res, next) {
    try {
        const productId = {_id: req.params.pid}
        const dataToUpdate = req.body;
        const product = await productRepository.read(productId)
        if (req.file) {
            const nuevoThumbnail = req.file.filename
            dataToUpdate.thumbnail = nuevoThumbnail
        }
        if (req.user._id == product.owner || req.user.rol == "admin") {
            const updated = await productRepository.update(productId, dataToUpdate)
            res.status(200).json(updated)
        } else {
            throw new ForbiddenError()
        }
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
        next(error);
    }
}


export async function productsDeleteController(req, res, next) {
    try {
        const productId = req.params.pid
        const product = await productRepository.read({ _id: productId })
        if (req.user._id == product.owner || req.user.rol == "admin") {
            if(product.owner != "admin"){
                const owner = await userRepository.readDTO({_id: product.owner})
                await mailer.send(owner.email, "Su producto fue eliminado", deleteProductMessage(product) )
            }
            const deletedProducts  = await productRepository.delete({ _id: productId })
            res.status(200).json(deletedProducts)
        } else {
            throw new ForbiddenError()
        }
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}