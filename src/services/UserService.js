import Service from './Service.js'
import { user } from '../models/index.js'
import ErrorBase from '../errors/ErrorBase.js'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const salt = Number(process.env.SALT)

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

    const codifyPassword = await hash(password, salt)

    const newUser = await user.create({ name, email, password: codifyPassword })
    return newUser
  }

  async login(entity) {
    const { email, password } = entity

    const foundUser = await user.findOne({ email })
    if (!foundUser) {
      throw new ErrorBase('Usuário não cadastrado!', 400)
    }
    if (!password) {
      throw new ErrorBase('A senha é obrigatória.', 400)
    }

    const verifyPassword = await compare(password, foundUser.password)
    if (!verifyPassword) {
      throw new ErrorBase('Email ou senha inválida!', 400)
    }

    const secret = process.env.SECRET
    const accessToken = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email
      },
      secret,
      {
        expiresIn: 3600
      }
    )

    return { accessToken }
  }
}

export default UserService
