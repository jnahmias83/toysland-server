const express = require("express");
const router = express.Router();
const cartsModel = require("../../models/Carts.model");
const toysModel = require("../../models/Toys.model");
const auth = require("../../middlewares/auth");
const sendEmail = require("../../config/mailer");

router.post("/:id", auth, async (req, res) => {
  try {
    const cart = await cartsModel.addToyToCart(
      req.payload._id,
      req.params.id,
      req.body.quantity
    );
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/sumtopay", auth, async (req, res) => {
  try {
    const carts = await cartsModel.getUserCart(req.payload._id);
    let sumtopay = 0;
    for (let cart of carts) {
      const toyData = await toysModel.selectToyById(cart.toyId);
      sumtopay += cart.quantity * toyData.price;
    }
    res.status(201).json(sumtopay);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const carts = await cartsModel.getUserCart(req.payload._id);

    const result = [];
    for (let cart of carts) {
      const toyData = await toysModel.selectToyById(cart.toyId);

      let toyObj = {
        name: toyData.name,
        description: toyData.description,
        price: toyData.price,
        category: toyData.category,
        img: toyData.img,
      };

      const res_obj = {
        _id: cart._id,
        userId: req.payload._id,
        toy: toyObj,
        quantity: cart.quantity,
      };
      result.push(res_obj);
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/paypal", auth, async (req, res) => {
  try {
    const carts = await cartsModel.getUserCart(req.payload._id);

    const results = [];
    let sumToPay = 0;
    for (let cart of carts) {
      const toyData = await toysModel.selectToyById(cart.toyId);
      sumToPay += cart.quantity * toyData.price;

      let toyObj = {
        name: toyData.name,
        description: toyData.description,
        price: toyData.price,
        category: toyData.category,
        img: toyData.img,
      };

      const res_obj = {
        _id: cart._id,
        userId: req.payload._id,
        toy: toyObj,
        quantity: cart.quantity,
      };
      results.push(res_obj);
    }

    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    const formattedToday = day + "/" + month + "/" + year;

    let html = "<h3>Your order details:</h3>";
    html += `<h3>Payment Date: ${formattedToday}</h3>`;
    html +=
      "<table colpadding='2' colspacing='2'><thead><tr style='text-align:center;background-color:black;color:white;'><th style='border:1px solid black;'>&nbsp;Name&nbsp;</th><th style='border:1px solid black;'>&nbsp;Description&nbsp;</th><th style='border:1px solid black;'>&nbsp;Category&nbsp;</th><th style='border:1px solid black;'>&nbsp;Price<br/>$USA&nbsp;</th><th style='border:1px solid black;'>Quantity</th><th style='border:1px solid black;'>&nbsp;Total Price<br/>$USA&nbsp;</th></tr></thead>";
    html += "<tbody>";
    for (r of results) {
      html += "<tr>";
      html += `<td style='text-align:center;border:1px solid black;'>${r.toy.name}</td>`;
      html += `<td style='text-align:center;border:1px solid black;'>${r.toy.description}</td>`;
      html += `<td style='text-align:center;border:1px solid black;'>${r.toy.category}</td>`;
      html += `<td style='text-align:center;border:1px solid black;'>${r.toy.price}</td>`;
      html += `<td style='text-align:center;border:1px solid black;'>${r.quantity}</td>`;
      html += `<td style='text-align:center;border:1px solid black;'>${
        r.toy.price * r.quantity
      } </td>`;
      html += "</tr>";
    }
    html += `<tr style='background-color:black;color:white'><td colspan='5' style='text-align:right'>Total to pay:</td><td style='text-align:center;'>${sumToPay.toFixed(2)} $USA</td></tr>`;
    html += "</tbody></table>";

    await sendEmail(
      process.env.EMAIL_EMAIL,
      req.payload.email,
      "Toysland - payment opered successfully by Paypal",
      html
    );
    await cartsModel.deleteUserCart(req.payload._id);
    res.status(201).json("pp");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await cartsModel.deleteCartById(req.params.id);
    res.status(201).json("Toy deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
