const express = require("express");
const router = express.Router();

const multer = require("../../config/multerTypes");
const upload = multer.createMulter(
  "../toysland-client/public/uploads/",
  3000000,
  multer.allowedTypes.img
);

const registerValidation = require("../../validation/register.validation");
const usersModel = require("../../models/Users.model");
const bcrypt = require("../../config/bcrypt");
const generateRandomAlphaNum = require("../../util/generateRandomAlphaNum");
const sendEmail = require("../../config/mailer");

router.post("/", upload.single("userimg"), async (req, res) => {
  try {
    const validatedValue = await registerValidation(req.body);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    if (user) {
      throw "Email already exists";
    }
    const hashedPassword = await bcrypt.createHash(validatedValue.password);

    let img = "";
    if (req.file) img = "/uploads/" + req.file.filename;

    const secretKey = generateRandomAlphaNum(8);
  
    const newUser = await usersModel.createUser(
      validatedValue.name,
      validatedValue.email,
      hashedPassword,
      img,
      secretKey
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
    res.status(400).send(err);
  }
});

module.exports = router;