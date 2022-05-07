const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  name: String,
  length: Number,
  duration: Number,
  visitedIn: String,
  difficulty: Number,
  scenery: Number,
  facilities: Number,
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park'
  }
})

routeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Route = mongoose.model('Route', routeSchema)

module.exports = Route