const Shop = require('../models/shop')
module.exports = {
  addShop: async (req, res) => {
    try {
      const { username, shopName, description, location } = req.body

      const shop = new Shop({
        username,
        shopName,
        description,
        location
      })
      await shop.save()
    } catch (e) {
      console.log(e)
      res.send('internal error')
    }
  }
}
