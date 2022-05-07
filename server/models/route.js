const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  name: String,
  length: Number,
  duration: Number,
  VisitedIn: String,
  difficulty: Number,
  scenery: Number,
  facilities: Number
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