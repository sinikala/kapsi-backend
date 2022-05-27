const reviewRouter = require('express').Router()
const User = require('../models/user')
const Review = require('../models/review')
const tokenIsValid = require('./tokenHelper')


reviewRouter.get('/:parkId', async (request, response) => {
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
  const reviews = await Review.find({ user: user._id, park: request.params.parkId })
  response.json(reviews)
})


reviewRouter.post('/', async (request, response) => {
  const { content, parkId } = request.body
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

  const newReview = new Review({
    content,
    createdAt: new Date(),
    user: user._id,
    username: user.username,
    park: parkId
  })

  const savedReview = await newReview.save()
  response.status(201).json(savedReview)
  user.reviews = user.reviews.concat(savedReview._id)
  await user.save()

})


module.exports = reviewRouter