export function registrarController(req, res) {
  try {
    res.render('register', {title: "Registrarse"})
  } catch (error) {
    //TODO
    res.send('error:' + JSON.stringify(error))
  }
}

export async function loginController(req, res, next) {
  try {
    let loggedIn
    if(req.user){
      loggedIn =  true
    } else {
      loggedIn = false }
    res.render('login', {title: "Login", loggedIn: loggedIn, user:req.user})
  } catch (error) {
    next(error)
  }
}

export function restablecerController(req, res, next) {
  try {
    res.render('restablecer', {title: "Restablecer"})
  } catch (error) {
    next(error)
  }
}

export function tokenController(req, res, next) {
  try {
    res.render('token', {title: "Restablecer", token: req.params.token})
  } catch (error) {
    next(error)
  }
}

export async function profileGetController(req, res, next) {
  try {
      const { rol } = req.user
      let orders
      switch(rol){
          case 'admin' :
          const users = await userRepository.readDTO();
          orders = await orderRepository.read()
          res.render('adminProfile', {
              title: 'Admin Profile',
              users,
              loggedIn: true,
              esUser: req.user.rol === "user" ? true : false,
              esAdmin: req.user.rol === "admin" ? true : false,
              esPremium: req.user.rol === "premium" ? true : false,
              user: req.user,
              orders
          })
          break
          case 'user' :
              const propiedadBuscada = 'documento'
              const valorBuscado1 = 'identificacion'
              const valorBuscado2 = 'domicilio'
              const valorBuscado3 = 'estadoDeCuenta'
              let identificacion = false ,domicilio = false, estadoDeCuenta = false
              req.user.documents.forEach((objeto) => {
                  if (objeto[propiedadBuscada] === valorBuscado1) {
                      identificacion = true
                  } else if (objeto[propiedadBuscada] === valorBuscado2) {
                      domicilio = true
                  } else if(objeto[propiedadBuscada] === valorBuscado3) {
                      estadoDeCuenta = true
                  }
              })
              orders = await orderRepository.read({purchaser: req.user.email})
              res.render('userProfile', {
              title: 'User Profile',
              user: req.user,
              identificacion,
              domicilio,
              estadoDeCuenta,
              loggedIn: true,
              esUser: req.user.rol === "user" ? true : false,
              esAdmin: req.user.rol === "admin" || req.user.rol === "premium" ? true : false,
              orders
          })
          break
          case 'premium':
              orders = await orderRepository.read({purchaser: req.user.email})
              res.render('premiumProfile', {
              title: 'Premium Profile',
              user: req.user,
              loggedIn: true,
              esUser: req.user.rol === "user" ? true : false,
              esAdmin: req.user.rol === "admin" ? true : false,
              esPremium: req.user.rol === "premium" ? true : false,
              orders
          })
      } 
  }catch (error) {
    next(error)
  }
}

export async function orderGetController(req, res, next) {
  try {
      const orders = await orderRepository.read({purchaser: req.user.email})
      orders.sort((a, b) => new Date(b.purchase_dateTime) - new Date(a.purchase_dateTime))
      const order = orders[0]
          res.render('order', {
              title: 'Orden de compra',
              user: req.user,
              loggedIn: true,
              esUser: req.user.rol === "user" ? true : false,
              esAdmin: req.user.rol === "admin" ? true: false,
              esPremium: req.user.rol === "premium" ? true : false,
              order
          })
      } catch (error) {
        next(error)}
}

