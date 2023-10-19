//import { productosService } from '../../services/productos.service.js'
import crearProductoMock from '../../mocks/productoMock.js';
import { Product } from '../../models/Product.js'
import { productRepository } from '../../repositories/index.js';

export async function productsGetController(req, res, next) {

    try {
        // Objeto vacío para el criterio de búsqueda inicial
        let criterioDeBusqueda = {};

        // Recorre el objeto req.query y agrega los criterios correspondientes al objeto de criterio de búsqueda
        for (let key in req.query) {
            if (key === 'title' || key === 'description' || key === 'price' || key === 'stock') {
                criterioDeBusqueda = { ...criterioDeBusqueda, [key]: req.query[key] };
            }
        }

        const opcionesDePaginacion = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            lean: true, // para que devuelva objetos literales, no de mongoose    
        }
        if (req.query.sort === 'asc') {
            opcionesDePaginacion.sort = { price: 1 };
        } else if (req.query.sort === 'desc') {
            opcionesDePaginacion.sort = { price: -1 };
        }
        const productos = await productRepository.paginate(criterioDeBusqueda, opcionesDePaginacion)
        res.status(200).json(productos)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function productsGetOneController(req, res, next) {
    try {
        const producto = await productRepository.read({ _id: req.params.pid })
        res.status(200).json(producto)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function productsPostController(req, res, next) {
    try {
        // Si estás utilizando el modelo de producto, simplemente crea una instancia con los datos del formulario
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            thumbnail: req.file.filename, // Multer guarda el nombre del archivo en req.file.filename
            code: req.body.code,
            stock: Number(req.body.stock),
            owner: req.user._id || "admin"
            // Otros campos que desees guardar en el producto
        });

        // Guardar el producto en la base de datos, aquí asumo que tienes un método llamado "registrar" en el repositorio
        const productoRegistrado = await productRepository.registrar(product);

        res.status(201).json(productoRegistrado);
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
        next(error);
    }
}

export async function mockProductsPostController(req, res, next) {
    try {
        const productosRegistrados = []
        for (let i = 0; i < 100; i++) {
            const product = crearProductoMock()
            const productoRegistrado = await productRepository.registrar(product)
            productosRegistrados.push(productoRegistrado)
        }
        res.status(201).json(productosRegistrados)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function productsPutController(req, res, next) {
    try {
        const idProducto = {_id: req.params.pid}
        const datosAActualizar = req.body;
        const product = await productRepository.read(idProducto)
        if (req.file) {
            const nuevoThumbnail = req.file.filename
            datosAActualizar.thumbnail = nuevoThumbnail
        }
        if (req.user._id == product.owner || req.user.rol == "admin") {
            const productoActualizado = await productRepository.update(idProducto, datosAActualizar)
            res.status(200).json(productoActualizado);
        } else {
            throw new Error("No tiene el permiso correspondiente");
        }
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
        next(error);
    }
}


export async function productsDeleteController(req, res, next) {
    try {
        const idProducto = req.params.pid
        const product = await productRepository.read({ _id: idProducto })
        if (req.user._id == product.owner || req.user.rol == "admin") {
            await productRepository.delete({ _id: idProducto })
            res.status(200)
        } else {
            //TODO
            throw new Error("no tiene el permiso correspondiente")
        }
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}