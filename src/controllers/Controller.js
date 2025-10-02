class Controller {
  constructor(service) {
    this.service = service
  }

  async findAll(req, res, next) {
    try {
      const entities = await this.service.findAll()
      return res.status(200).json(entities)
    } catch (err) {
      next(err)
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params
      const entity = await this.service.findById(id)
      return res.status(200).json(entity)
    } catch (err) {
      next(err)
    }
  }

  async createNew(req, res, next) {
    try {
      const newRegister = await this.service.createNew(req.body)
      return res.status(201).send({
        message: 'Criado com sucesso.',
        newRegister
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      await this.service.update(id, req.body)
      return res.status(200).send({ message: 'Atualizado com sucesso.' })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await this.service.deleteById(id)
      return res.status(200).send({ message: 'Deletado com sucesso.' })
    } catch (err) {
      next(err)
    }
  }
}

export default Controller
