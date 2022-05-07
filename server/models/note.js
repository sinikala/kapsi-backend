const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  parkUri: String,
  visitedIn: String,
  createdAt: Date,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  routes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route'
    }
  ],
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note