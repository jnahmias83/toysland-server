const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toysSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String }
});

const Toys = mongoose.model("toys", toysSchema);

const createToy = (name, description, category, price, img) => {
  let toyToAdd = {
    name,
    description,
    category,
    price,
    img
  };

  const toy = new Toys(toyToAdd);
  return toy.save();
};

const selectToys = () => {
  return Toys.find();
};

const selectFiewToys = () => {
  return Toys.find().limit(6);
};

const selectToyById = (id) => {
  return Toys.findOne({_id: id});
};

const updateToyById = (id, name, description, category, price, img) => {
  let toyToUpdate = {
    name,
    description,
    category,
    price,
    img
  };
  return Toys.findOneAndReplace({_id: id}, toyToUpdate);
};

const deleteToyById = (id) => {
  return Toys.findOneAndRemove({_id: id});
};

module.exports = {
  createToy,
  selectToys,
  selectFiewToys,
  selectToyById,
  updateToyById,
  deleteToyById
};
