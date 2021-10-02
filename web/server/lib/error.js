const tryParseJSON = require('./tryParseJSON')

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err
  statusCode = statusCode || 500
  message = message || 'Internal server error'
  message = err?.response?.data?.errorMessage || message

  const { stack } = new Error()
  const filtered = stack.split('\n').filter($ => !/node_modules/.test($)).join('\n')
  console.log(message, filtered)

  // Used for Passport errors
  const { error, error_description: errorDescription } =
    tryParseJSON(message) || {}

  res && res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: errorDescription || message,
    error: error || null
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
