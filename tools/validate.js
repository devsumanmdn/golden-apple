// eslint-disable-next-line
exports.isValidShop = function isValidShop({ name, description, location }) {
  return (
    typeof name !== 'string' ||
    name.length < 3 ||
    typeof description !== 'string' ||
    location == null ||
    `${location.pinCode}`.length !== 6
  )
}
