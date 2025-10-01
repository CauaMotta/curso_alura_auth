class Controller {
  constructor(service) {
    this.service = service
  }

  async createNew(req, res, next) {
    try {
      const newRegister = await this.service.createNew(req.body)
      return res.status(201).json(newRegister)
    } catch (err) {
      next(err)
    }
  }
}

export default Controller
