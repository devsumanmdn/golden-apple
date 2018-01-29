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
  isPrivate: {
    type: Boolean,
    default: true
  },
  location: {
    pinCode: {
      type: Number,
      required: true,
      min: 6
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    road: {
      type: String
    },
    postOffice: {
      type: String
    },
    city: {
      type: String,
      required: true
    }
  }
})

const Store = mongoose.model('store', StoreSchema)

module.exports = Store
module.exports.StoreSchema = StoreSchema
