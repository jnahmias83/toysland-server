const express = require("express");
const router = express.Router();
const jwt = require("../../config/jwt");
const userModel = require("../../models/UsersAndCards.model");
const bcrypt = require("../../config/bcrypt");
const resetPasswordValidation = require("../../validation/resetPassword.validation");

router.post("/:token", async (req, res) => {
  try {
    const payload = await jwt.verifyToken(
      req.params.token,
      process.env.JWT_RESET_PASSWORD_KEY
    );
    const validatedValue = await resetPasswordValidation(req.body);
    const user = await userModel.findUserByEmail(payload.email);
    if (!user) {
      return res.json({ msg: "password reset successfuly" });
    }
    
    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    await userModel.updateUserPasswordByEmail(payload.email, hashedPassword);
    res.json({ msg: "password reset successfuly" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
