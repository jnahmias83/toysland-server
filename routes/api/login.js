const express = require("express");
const router = express.Router();
const loginValidation = require("../../validation/login.validation");
const usersModel = require("../../models/UsersAndCards.model");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await loginValidation(req.body);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    if (!user) {
      throw "invalid email and/or password";
    }

    if (!user.isMailValid) {
      throw "please validate the email first";
    }
    
    const hashResult = await bcrypt.cmpHash(
      validatedValue.password,
      user.password
    );

    if (!hashResult) {
      throw "invalid email and/or password";
    }

    const token = await jwt.generateToken(
      {
        _id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );

    res.json({ token });
    
  } catch (err) {
    res.status(400).json({ err }); 
  }
});

module.exports = router;
