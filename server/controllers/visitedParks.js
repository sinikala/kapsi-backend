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


// new visited park
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
    user: user._id
  })

  if (comment) {
    newVisitedPark.comments = [{ createdAt: new Date(), comment: comment }]
  }

  const savedVisitedPark = await newVisitedPark.save()
  user.visitedParks = user.visitedParks.concat(savedVisitedPark._id)
  await user.save()
  response.status(201).json(savedVisitedPark)
})


// Add new comment to visited park
visitedParkRouter.put('/comment/:id', async (request, response) => {
  const { comment } = request.body
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

  const oldVisitedPark = await VisitedPark.findById(request.params.id)
  const newComment = { createdAt: new Date(), comment: comment }

  try {
    oldVisitedPark.comments.push(newComment)
    await oldVisitedPark.save()
    const updated = await VisitedPark.findById(request.params.id)
    response.json(updated)
  } catch {
    return response.status(500).json({
      error: 'error while updating'
    })
  }
})

module.exports = visitedParkRouter