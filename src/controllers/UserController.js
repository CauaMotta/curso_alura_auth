import Controller from './Controller.js'
import UserService from '../services/UserService.js'

class UserController extends Controller {
  constructor() {
    super(new UserService())
  }

  async login(req, res, next) {
    try {
      const login = await this.service.login(req.body)
      return res.status(200).json(login)
    } catch (err) {
      next(err)
    }
  }
}

export default UserController
