const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toysSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isPrefered: { type: Boolean, required: true, default: false },
});

const Toys = mongoose.model("toys", toysSchema);

const createToy = (name, description, category, price, img, userId) => {
  let toyToAdd = {
    name,
    description,
    category,
    price,
    img,
    userId,
  };

  const toy = new Toys(toyToAdd);
  return toy.save();
};

const selectToys = () => {
  return Toys.find();
};

const selectFiewToys = () => {
  return Toys.find().limit(4);
};

const selectUserToys = (userId) => {
  return Toys.find({ userId: userId });
};

const selectUserPreferedToys = (userId) => {
  return Toys.find({ userId, isPrefered: true });
};

const selectToyById = (id) => {
  return Toys.findOne({ _id: id });
};

const updateToyById = (id, name, description, category, price, img, isPrefered, userId) => {
  let toyToUpdate = {
    name,
    description,
    category,
    price,
    img,
    isPrefered,
    userId
  };
  return Toys.findOneAndReplace({ _id: id }, toyToUpdate);
};

const setToPrefered = (id, name, description, category, price, img, isPrefered, userId) => {
  let newIsPreferedVal = true;
  if(isPrefered == true) newIsPreferedVal = false;
  let toyToUpdate = {
    name,
    description,
    category,
    price,
    img,
    isPrefered: newIsPreferedVal,
    userId
  };
  return Toys.findOneAndReplace({ _id: id }, toyToUpdate);
};

const deleteToyById = (id) => {
  return Toys.findOneAndRemove({ _id: id });
};

module.exports = {
  createToy,
  selectToys,
  selectFiewToys,
  selectToyById,
  updateToyById,
  setToPrefered,
  selectUserToys,
  selectUserPreferedToys,
  deleteToyById,
};
