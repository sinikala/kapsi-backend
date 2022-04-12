const mongoose = require('mongoose')

const parkSchema = new mongoose.Schema({
  park: String,
  label: String,
  inceptionYear: String,
  locatedInLabel: [String],
  coordinates: [String],
  image: String
})


parkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Park', parkSchema)