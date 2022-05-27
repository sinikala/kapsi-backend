const visitedParkRouter = require('express').Router()
const User = require('../models/user')
const VisitedPark = require('../models/visitedPark')
const tokenIsValid = require('./tokenHelper')


visitedParkRouter.get('/', async (request, response) => {
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
  const visitedParks = await VisitedPark
    .find({ user: user._id })
    .populate('routes')

  response.json(visitedParks)
})


visitedParkRouter.post('/', async (request, response) => {
  const { parkId, visitedIn, comment } = request.body
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

  const newVisitedPark = new VisitedPark({
    park: parkId,
    visitedIn,
    createdAt: new Date(),
    comments: [{ createdAt: new Date(), comment: comment }],
    user: user._id
  })

  const savedVisitedPark = await newVisitedPark.save()
  user.visitedParks = user.visitedParks.concat(savedVisitedPark._id)
  await user.save()

  response.status(201).json(savedVisitedPark)
})

module.exports = visitedParkRouter