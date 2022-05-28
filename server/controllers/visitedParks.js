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
  //const user = await User.findById(decodedToken.id)
  const oldVisitedPark = await VisitedPark.findById(request.params.id)
  const updatedComments = oldVisitedPark.comments.concat(
    { createdAt: new Date(), comment: comment }
  )
  try {
    const updated = await VisitedPark.findOneAndUpdate(
      request.params.id, { comments: updatedComments }, { new: true }
    )
    response.json(updated)
  } catch {
    console.log('error')
  }
  // const updatedVisitedPark = new VisitedPark({
  //   park: oldVisitedPark.park,
  //   visitedIn: oldVisitedPark.visitedIn,
  //   createdAt: oldVisitedPark.createdAt,
  //   comments: oldVisitedPark.comments.concat({ createdAt: new Date(), comment: comment }),
  //   user: user._id,
  //   routes: oldVisitedPark.routes
  // })

  // VisitedPark.findByIdAndUpdate(request.params.id, updatedVisitedPark, { new: true })
  //   .then(updatedVisitedPark => {
  //     response.json(updatedVisitedPark)
  //   })
  //   .catch(error => console.log(error))
})

module.exports = visitedParkRouter