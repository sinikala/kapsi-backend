const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  content: String,
  createdAt: Date,
  username: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park'
  }
})

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review