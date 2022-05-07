const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


const tokenIsValid = request => {
  const token = getTokenFrom(request)
  return jwt.verify(token, process.env.SECRET)
}

module.exports = tokenIsValid