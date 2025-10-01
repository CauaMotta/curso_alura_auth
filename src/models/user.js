import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: {
    type: String,
    required: [true, 'O campo `name` é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'O campo `email` é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Insira um email válido.']
  },
  password: {
    type: String,
    required: [true, 'O campo `password` é obrigatório.'],
    trim: true
  }
})

const user = mongoose.model('users', userSchema)

export default user
