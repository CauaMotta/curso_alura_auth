import mongoose from 'mongoose'
import ErrorBase from '../errors/ErrorBase.js'
import BadRequestError from '../errors/BadRequestError.js'
import ValidationError from '../errors/ValidationError.js'

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new BadRequestError().sendResponse(res)
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res)
  } else if (err instanceof ErrorBase) {
    err.sendResponse(res)
  } else {
    new ErrorBase().sendResponse(res)
  }
}

export default errorHandler
