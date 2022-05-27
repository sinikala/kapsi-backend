const mongoose = require('mongoose')

const visitedParkSchema = new mongoose.Schema({
  visitedIn: String,
  createdAt: Date,
  comments: [{ createdAt: Date, comment: String }],
  routes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route'
    }
  ],
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

visitedParkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const VisitedPark = mongoose.model('VisitedPark', visitedParkSchema)

module.exports = VisitedPark