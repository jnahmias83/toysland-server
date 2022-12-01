const express = require("express");
const router = express.Router();
const cardsValidation = require("../../validation/cards.validation");
const cardsModel = require("../../models/UsersAndCards.model");
const auth = require("../../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    const validatedValue = await cardsValidation(req.body);
    const card = await cardsModel.findUserCard(req.payload._id);
    await cardsModel.addToyTocard(
      card,
      validatedValue.name,
      validatedValue.category,
      validatedValue.description,
      validatedValue.price,
      validatedValue.img,
      validatedValue.quantity
    );
    res.status(200).send(card);

    if (!card) res.status(400).send("Toy no added to the user's card");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let card = await cardsModel.findUserCard(req.payload._id);
    console.log(card);
    if (!card) return res.status(404).send("No card for user");
    res.status(200).send(card.toys);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
