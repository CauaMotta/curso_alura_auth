import Service from './Service.js'
import { user } from '../models/index.js'
import ErrorBase from '../errors/ErrorBase.js'
import { hash } from 'bcrypt'

class UserService extends Service {
  constructor() {
    super(user)
  }

  async createNew(entity) {
    const { name, email, password } = entity

    const verifyEmail = await user.findOne({ email })
    if (verifyEmail) {
      throw new ErrorBase('Este endereço de email já foi cadastrado!', 400)
    }
    if (!password) {
      throw new ErrorBase('A senha é obrigatória', 400)
    }

    const salt = Number(process.env.SALT)
    const codifyPassword = await hash(password, salt)

    const newUser = await user.create({ name, email, password: codifyPassword })
    return newUser
  }
}

export default UserService
