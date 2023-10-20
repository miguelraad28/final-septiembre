import { userService } from "../../services/user.service.js";

export async function postTokenController(req, res, next) {
    try {
      const filter = {email: req.body.email}
      const created = await userService.generarTokenPassword(filter)
      res.status(201).json(created)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}