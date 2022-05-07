const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: String,
  createdAt: Date,
  public: Boolean,
  type: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment