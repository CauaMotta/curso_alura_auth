class Service {
  constructor(database) {
    this.database = database
  }

  async findAll() {
    return this.database.find()
  }

  async findById(id) {
    return this.database.findById(id)
  }

  async createNew(entity) {
    return this.database.create(entity)
  }

  async update(id, entity) {
    return this.database.findByIdAndUpdate(id, entity)
  }

  async deleteById(id) {
    return this.database.findByIdAndDelete(id)
  }
}

export default Service
