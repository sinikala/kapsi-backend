const routeRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
const Route = require('../models/route')
const tokenIsValid = require('./tokenHelper')


routeRouter.get('/:parkId', async (request, response) => {
  let decodedToken = ''

  try {
    decodedToken = tokenIsValid(request)
    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
  } catch {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  const user = await User.findById(decodedToken.id)
  const routes = await Route.find({ user: user._id, park: request.params.parkId })
  response.json(routes)
})


routeRouter.post('/', async (request, response) => {
  const { name, length, duration, visitedIn, difficulty,
    scenery, facilities, comment, noteId, parkId } = request.body
  let decodedToken = ''

  try {
    decodedToken = tokenIsValid(request)
    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
  } catch {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  const user = await User.findById(decodedToken.id)
  const note = await Note.findById(noteId)

  const newRoute = new Route({
    name,
    length,
    duration,
    visitedIn,
    difficulty,
    scenery,
    facilities,
    comment,
    user: user._id,
    park: parkId
  })

  const savedRoute = await newRoute.save()
  note.routes = note.routes.concat(savedRoute._id)
  await note.save()

  response.status(201).json(savedRoute)

})


module.exports = routeRouter