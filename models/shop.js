const mongoose = require('mongoose')
const _ = require('lodash')
const keys = require('../config/keys')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const ShopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      unique: true,
      minlength: 1
    },
    description: {
      type: String
    },
    location: [
      {
        pin: {
          type: Number,
          required: true
        },
        longitude: {
          type: Number,
          required: true
        },
        latitude: {
          type: Number,
          required: true
        },
        lebel: {
          type: String,
          required: true
        },
        Road: {
          type: String
        },
        postOffice: {
          type: String
        },
        City: {
          type: String,
          required: true
        },
        outsideCity: {
          type: Boolean,
          required: true
        },
        approx_dist: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { usePushEach: true }
)

const Shop = mongoose.model('shop', ShopSchema)

module.exports = Shop
