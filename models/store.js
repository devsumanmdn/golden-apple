const mongoose = require('mongoose')
const { Schema } = mongoose

const StoreSchema = new Schema({
  name: {
    type: String,
    min: 3
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String
  },
  location: {
    pinCode: {
      type: Number,
      min: 6
    }
  }
})

const Store = mongoose.model('store', StoreSchema)

module.exports = Store
module.exports.StoreSchema = StoreSchema
