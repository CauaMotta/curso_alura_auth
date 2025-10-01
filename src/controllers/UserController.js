import Controller from './Controller.js'
import UserService from '../services/UserService.js'

class UserController extends Controller {
  constructor() {
    super(new UserService())
  }
}

export default UserController
