const noteRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
const tokenIsValid = require('./tokenHelper')


noteRouter.get('/:userId', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

noteRouter.post('/', async (request, response) => {
  const { parkId, visitedIn } = request.body

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

  const newNote = new Note({
    park: parkId,
    visitedIn,
    createdAt: new Date(),
    user: user._id
  })

  const savedNote = await newNote.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

module.exports = noteRouter