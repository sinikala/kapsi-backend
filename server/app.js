const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const parkRouter = require('./controllers/parks')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const visitedParkRouter = require('./controllers/visitedParks')
const plannedParkRouter = require('./controllers/plannedParks')
const reviewRouter = require('./controllers/reviews')
const routeRouter = require('./controllers/routes')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


//logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/parks', parkRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/visitedParks', visitedParkRouter)
app.use('/api/plannedParks', plannedParkRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/routes', routeRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/test')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app