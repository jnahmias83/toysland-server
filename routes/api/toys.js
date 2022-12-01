const express = require("express");
const router = express.Router();

const multer = require("../../config/multerTypes");
const upload = multer.createMulter(
  "../toysland-client/public/uploads/",
  3000000,
  multer.allowedTypes.img
);

const toysValidation = require("../../validation/toys.validation");
const toysModel = require("../../models/Toys.model");
const auth = require("../../middlewares/auth");

router.post("/", auth, upload.single("toyimg"), async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can add toys");

    const validatedValue = await toysValidation.ToyValidation(req.body);

    let img = "";
    if (req.file) img = "/uploads/" + req.file.filename;

    const toy = await toysModel.createToy(
      validatedValue.name,
      validatedValue.description,
      validatedValue.category,
      validatedValue.price,
      img
    );
    res.status(201).json(toy);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/fewtoys", auth, async (req, res) => {
  try {
    const toys = await toysModel.selectFiewToys();
    res.json(toys);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const toy = await toysModel.selectToyById(req.params.id);
    res.json(toy);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const toys = await toysModel.selectToys();
    res.json(toys);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.put("/:id", auth, upload.single("toyimg"), async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("only admin can edit toys");

    const validatedValue = await toysValidation.ToyValidation(req.body);

    let toy = await toysModel.selectToyById(req.params.id);

    let img = "";
    if (req.file) img = "/uploads/" + req.file.filename;
    else img = toy.img;

    await toysModel.updateToyById(
      req.params.id,
      validatedValue.name,
      validatedValue.description,
      validatedValue.category,
      validatedValue.price,
      img
    );
    res.status(201).json("Toy updated successfully");
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can delete toys");

    await toysModel.deleteToyById(req.params.id);
    res.status(201).json("Toy deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
