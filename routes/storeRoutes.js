const { ObjectId } = require('mongoose').Types
const Store = require('../models/store')
const User = require('../models/user')
const { isValidShop } = require('../tools/validate')

module.exports = {
  addShop: async (req, res) => {
    try {
      const { name, description, location } = req.body
      if (isValidShop(req.body) && !req.user.id) {
        throw new Error('Validation failed')
      }
      const shopId = new ObjectId()
      const ownerId = req.user.id
      const shop = new Store({
        name,
        shopId,
        ownerId,
        location,
        description
      })
      await User.findByIdAndUpdate(ownerId, { $push: { stores: shop } })
      await shop.save()
      return res.send('Done')
    } catch (e) {
      return res.status(403).send(e.message)
    }
  },

  getStores: async (req, res) => {
    const stores = await Store.find({ isPrivate: false })
    res.json(stores)
  },

  getSingleStore: async (req, res) => {
    try {
      const { storeId } = req.params
      const store = await Store.findById(storeId)
      if (!store /*|| store.isPrivate*/) {
        throw new Error('Store not found')
      }
      res.json(store)
    } catch (e) {
      res.status(403).send({ error: e.message })
    }
  },

  toggleVisiblity: async (req, res) => {
    try {
      const { shopId } = req.body
      const ownerId = req.user.id
      if (!ownerId) {
        throw new Error('User authentication failed!')
      }
      const shop = await Store.findById(shopId)
      if (!shop) {
        throw new Error(`No shop found with id ${shopId}`)
      }
      if (shop.ownerId.toHexString() !== ownerId.toHexString()) {
        throw new Error('Not allowed')
      }
      shop.isPrivate = !shop.isPrivate
      await shop.save()
      res.send({
        success: `Store is ${shop.isPrivate ? 'Hidden' : 'Visible'}`
      })
    } catch (e) {
      res.status(403).send({ error: e.message })
    }
  },

  deleteShop: async (req, res) => {
    try {
      const { shopId } = req.body
      const ownerId = req.user.id
      if (!ownerId) {
        throw new Error('User authentication failed!')
      }
      let shop = await Store.findById(shopId)
      if (!shop) {
        throw new Error(`No shop found with id ${shopId}`)
      }
      if (shop.ownerId.toHexString() !== ownerId.toHexString()) {
        throw new Error('Not allowed')
      }
      shop = await Store.findByIdAndRemove(shopId)
      await User.findByIdAndUpdate(ownerId, {
        $pull: { stores: new ObjectId(shopId) }
      })
      return res.send('Deleted successfully')
    } catch (e) {
      return res.status(403).send({ error: e.message })
    }
  }
}
