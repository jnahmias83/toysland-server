const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isMailValid: { type: Boolean, default: false },
  secretKey: { type: String, required: false },
  isAdmin: { type: Boolean, required: true }
});

const Users = mongoose.model("users", usersSchema);

const cardsSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  toys: [
    {
      name: String,
      category: String,
      description: String,
      price: Number,
      img: String,
      quantity: String
    },
  ],
});

const Card = mongoose.model("cards", cardsSchema);

const findUserByEmail = (email) => {
  return Users.findOne({ email });
};

const createUser = (name, email, hashedPassword, secretKey, isAdmin) => {
  const user = new Users({
    name,
    email,
    password: hashedPassword,
    secretKey,
    isAdmin
  });
  user.save();
  
  let card = new Card({ userId: user._id, toys: [] });
  card.save();
  return card;
};

const updateIsMailValid = (email) => {
  return Users.findOneAndUpdate({ email }, { isMailValid: true });
};

const updateUserPasswordByEmail = (email, hashedPassword) => {
  return Users.findOneAndUpdate({ email }, { password: hashedPassword });
};

const findUserDetails = (id) => {
  return Users.findById({_id: id});
}

const findUserCard = (id) => {
  return Card.findOne({userId: id});
}

const addToyTocard = (card, name, category, description, price, img, quantity) => {
  console.log(card.userId);
  card.toys.push({ name, category, description, price, img, quantity });
  card.save();
  return card;
};

const getUserCard = (id) => {
  return Card.findOne({ userId: id });
}

module.exports = {
  findUserByEmail,
  createUser,
  updateIsMailValid,
  updateUserPasswordByEmail,
  findUserDetails,
  findUserCard,
  addToyTocard,
  getUserCard
};
