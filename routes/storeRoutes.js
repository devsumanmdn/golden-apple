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
      const ownerId = new ObjectId(req.user.id)
      const shop = new Store({
        name,
        shopId,
        ownerId,
        location,
        description
      })
      await User.findByIdAndUpdate(ownerId, { $push: { stores: shop } })
      await shop.save()
      return res.send('Store created!')
    } catch (e) {
      return res.status(403).send(e.message)
    }
  },
  deleteShop: async (req, res) => {
    try {
      const { shopId } = req.body
      const ownerId = req.user.id
      if (!ownerId) {
        throw new Error('User authentication failed!')
      }
      const shop = await Store.findByIdAndRemove(shopId)
      if (!shop) {
        throw new Error(`No shop found with id ${shopId}`)
      }
      await User.findByIdAndUpdate(ownerId, {
        $pull: { stores: new ObjectId(shopId) }
      })
      return res.send('Deleted successfully')
    } catch (e) {
      return res.status(403).send(e.message)
    }
  }
}
