const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  toyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "toys",
    required: true
  },
  quantity:{ type: Number, required: true }
});

const Carts = mongoose.model("carts", cartsSchema);

const addToyToCart = (userId, toyId, quantity) => {
  let cartToAdd = {
    userId,
    toyId,
    quantity
  };

  const cart = new Carts(cartToAdd);
  return cart.save();
};

const getUserCart = (userId) => {
  return Carts.find( { userId })
}

const deleteCartById = (id) => {
  return Carts.findOneAndRemove( { _id: id });
}

const deleteUserCart = (userId) => {
  return Carts.deleteMany( { userId });
}

module.exports = {
  addToyToCart,
  getUserCart,
  deleteCartById,
  deleteUserCart
};