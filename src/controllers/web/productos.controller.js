import { productRepository } from '../../repositories/index.js'

export async function productsGetController(req, res, next) {
    try {
        let criterioDeBusqueda = {};
        for (let key in req.query) {
            if (key === 'title' || key === 'description' || key === 'price' || key === 'stock') {
                criterioDeBusqueda = { ...criterioDeBusqueda, [key]: req.query[key] }
            }
        }
        const opcionesDePaginacion = {
            limit: req.query.limit || 12,
            page: req.query.page || 1,
            lean: true 
        }
        if (req.query.sort === 'asc') {
            opcionesDePaginacion.sort = { price: 1 }
        } else if (req.query.sort === 'desc') {
            opcionesDePaginacion.sort = { price: -1 }
        }
        const productos = await productRepository.paginate(criterioDeBusqueda, opcionesDePaginacion)
        const queryParams = Object.keys(req.query)
            .filter(key => key !== 'page') // excluimos la propiedad "page"
            .map(key => `${key}=${req.query[key]}`)
            .join('&')
        res.render('productos', {
            esUser: req.user.rol === "user" ? true : false,
            esAdmin: req.user.rol === "admin" ? true : false,
            esPremium: req.user.rol === "premium" ? true : false,
            query: queryParams,
            productos: productos,
            hayProductos: productos.docs.length > 0,
            titulo: 'Productos',
            loggedIn: true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

export async function productsGetOneController(req, res, next) {
    try {
        const id = req.params.pid
        const producto = await productRepository.read({_id: id})
        let editar = false
        if(req.user._id == producto.owner){
            editar = true
        }
        res.render('producto', {
            esUser: req.user.rol === "user" ? true : false,
            esAdmin: req.user.rol === "admin" ? true : false,
            esPremium: req.user.rol === "premium" ? true : false,
            user: req.user,
            producto: producto,
            titulo: 'Producto',
            loggedIn: true,
            editar
        })
    } catch (error) {
        next(error)
    }
}

export async function crearProductsGetController(req, res, next) {
    try {
        res.render('crearProductos', {
            esUser: req.user.rol === "user" ? true : false,
            esAdmin: req.user.rol === "admin" || req.user.rol === "premium" ? true : false,
            user: req.user?.email,
            rol: req.user?.rol,
            titulo: 'Crear Productos',
            loggedIn: true,
        })
    } catch (error) {
        next(error)
    }
}

export async function editarProductsGetController(req, res, next) {
    try {
        const idProduct = req.params.pid
        const product = await productRepository.read({_id: idProduct})
        res.render('editProducts', {
            esUser: req.user.rol === "user" ? true : false,
            esAdmin: req.user.rol === "admin" || req.user.rol === "premium" ? true : false,
            user: req.user?.email,
            rol: req.user?.rol,
            titulo: 'Editar Productos',
            loggedIn: true,
            product: product
        })
    } catch (error) {
        next(error)
    }
}