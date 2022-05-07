const commentRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
const Comment = require('../models/comment')
const tokenIsValid = require('./tokenHelper')


commentRouter.get('/:parkId', async (request, response) => {
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
  const comments = await Comment.find({ user: user._id, park: request.params.parkId })
  response.json(comments)
})


commentRouter.post('/', async (request, response) => {
  const { content, parkId, noteId, public, type } = request.body
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

  const newComment = new Comment({
    content,
    createdAt: new Date(),
    public,
    type,
    user: user._id,
    park: parkId
  })

  const savedComment = await newComment.save()
  note.comments = note.comments.concat(savedComment._id)
  await note.save()

  response.status(201).json(savedComment)

})


module.exports = commentRouter