const mongoose = require('mongoose')

const plannedParkSchema = new mongoose.Schema({
  comment: String,
  editedAt: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park'
  }
})

plannedParkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const PlannedPark = mongoose.model('PlannedPark', plannedParkSchema)

module.exports = PlannedPark