const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  visitedParks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VisitedPark'
    }
  ],
  plannedParks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlannedPark'
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User