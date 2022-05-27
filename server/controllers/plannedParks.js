const plannedParkRouter = require('express').Router()
const User = require('../models/user')
const PlannedPark = require('../models/plannedPark')
const tokenIsValid = require('./tokenHelper')


plannedParkRouter.get('/:parkId', async (request, response) => {
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
  const plannedParks = await PlannedPark.find({ user: user._id, park: request.params.parkId })
  response.json(plannedParks)
})


plannedParkRouter.post('/', async (request, response) => {
  const { comment, parkId } = request.body
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

  const newPlannedPark = new PlannedPark({
    comment,
    editedAt: new Date(),
    user: user._id,
    park: parkId
  })

  const savedPlannedPark = await newPlannedPark.save()
  response.status(201).json(savedPlannedPark)
  user.plannedParks = user.plannedParks.concat(savedPlannedPark._id)
  await user.save()
})


module.exports = plannedParkRouter