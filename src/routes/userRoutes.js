import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import auth from '../middleware/auth.js'

const userController = new UserController()
const router = Router()

// Public routes
router.post('/usuarios/login', (req, res, next) =>
  userController.login(req, res, next)
)
router.post('/usuarios', (req, res, next) =>
  userController.createNew(req, res, next)
)

// Private routes
router.use(auth)

router.get('/usuarios', (req, res) =>
  res.status(200).send({ message: 'Tudo certo por aqui!' })
)

export default router
