const noteRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
const tokenIsValid = require('./tokenHelper')


noteRouter.get('/:userId', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

noteRouter.post('/', async (request, response) => {
  const { parkUri, visitedIn } = request.body

  const decodedToken = tokenIsValid(request)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  const newNote = new Note({
    parkUri,
    visitedIn,
    createdAt: new Date(),
    user: user._id
  })

  const savedNote = await newNote.save()


  user.notes = user.notes.concat(savedNote._id)

  console.log('user', user)
  await user.save()

  response.status(201).json(savedNote)

})


module.exports = noteRouter