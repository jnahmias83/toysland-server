const express = require("express");
const router = express.Router();

const confirmRegisterValidation = require("../../validation/confirmRegister.validation");
const usersModel = require("../../models/Users.model");

router.get("/:email/:secretKey", async (req, res) => {
  try {
    const validatedValue = await confirmRegisterValidation(req.params);
    const user = await usersModel.findUserByEmail(validatedValue.email);

    if (!user) {
      throw "something went wrong";
    }

    if (user.secretKey !== validatedValue.secretKey) {
      throw "something went wrong";
    }

    await usersModel.updateIsMailValid(validatedValue.email);
    res.json({ status: "OK" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
