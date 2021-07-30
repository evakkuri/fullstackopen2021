const logger = require('./logger')

const requestLogger = (request: any, _response: any, next: any) => {
  logger.info('Timestamp:', new Date())
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

module.exports = {
  requestLogger
}