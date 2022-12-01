const express = require("express");
const router = express.Router();

const registerRouter = require("./api/register");
const loginRouter = require("./api/login");
const forgetPasswordRouter = require("./api/forgetpassword");
const confirmrRegisterRouter = require("./api/confirmregister");
const resetPasswordRouter = require("./api/resetpassword");
const profileRouter = require("./api/profile");
const toysRouter = require("./api/toys");
const cardsRouter = require("./api/cards");

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/forgetpassword", forgetPasswordRouter);
router.use("/confirmregister", confirmrRegisterRouter);
router.use("/resetpassword", resetPasswordRouter);
router.use("/profile", profileRouter);
router.use("/toys", toysRouter);
router.use("/cards", cardsRouter);

module.exports = router;
