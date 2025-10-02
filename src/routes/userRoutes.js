import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import auth from '../middleware/auth.js'
import roles from '../middleware/roles.js'

const userController = new UserController()
const router = Router()

// Public routes
router.post('/usuarios/login', (req, res, next) =>
  userController.login(req, res, next)
)

// Private routes
router.use(auth)

router.get('/usuarios', roles(['ADMIN']), (req, res, next) =>
  userController.findAll(req, res, next)
)
router.get('/usuarios/:id', roles(['ADMIN']), (req, res, next) =>
  userController.findById(req, res, next)
)
router.post('/usuarios', roles(['ADMIN']), (req, res, next) =>
  userController.createNew(req, res, next)
)
router.put('/usuarios/:id', roles(['ADMIN']), (req, res, next) =>
  userController.update(req, res, next)
)
router.delete('/usuarios/:id', roles(['ADMIN']), (req, res, next) =>
  userController.delete(req, res, next)
)

export default router
