const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  visitedIn: String,
  createdAt: Date,
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park'
  },
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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