const express = require("express");
const router = express.Router();
const registerValidation = require("../../validation/register.validation");
const usersModel = require("../../models/UsersAndCards.model");
const bcrypt = require("../../config/bcrypt");
const generateRandomAlphaNum = require("../../util/generateRandomAlphaNum");
const sendEmail = require("../../config/mailer");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await registerValidation(req.body);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    if (user) {
      throw "email already exists";
    }
    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    const secretKey = generateRandomAlphaNum(8);
  
    const newUser = await usersModel.createUser(
      validatedValue.name,
      validatedValue.email,
      hashedPassword,
      secretKey,
      validatedValue.isAdmin
    );
    const linkToSend = `http://localhost:8000/api/confirmregister/${validatedValue.email}/${secretKey}`;
    await sendEmail(
      process.env.EMAIL_EMAIL,
      validatedValue.email,
      "Please confirm your email",
      linkToSend
    );
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;