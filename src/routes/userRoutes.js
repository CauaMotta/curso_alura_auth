import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const userController = new UserController()
const router = Router()

router.get('/usuarios', (req, res) =>
  res.status(200).send({ message: 'Tudo certo por aqui!' })
)
router.post('/usuarios', (req, res, next) =>
  userController.createNew(req, res, next)
)

export default router
