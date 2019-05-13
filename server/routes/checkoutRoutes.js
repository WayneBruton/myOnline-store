const express = require("express");
const router = express.Router();
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);

router.get("/deliveryDetails/:id", (req, res) => {
  let mysql = `select * from users where id = ${req.params.id}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      res.json(result);
    });
    connection.release();
  });
});

router.put("/updateDelivery", (req, res) => {
  let city = req.body.city;
  let contact_number = req.body.contact_number;
  let delivery_address = req.body.delivery_address;
  let email = req.body.email;
  let first_name = req.body.first_name;
  let id = req.body.id;
  let last_name = req.body.last_name;
  let postal_code = req.body.postal_code;
  let province = req.body.province;
  let suburb = req.body.suburb;
  let mysql = `Update users set city = '${city}', contact_number = '${contact_number}',delivery_address = '${delivery_address}', postal_code = '${postal_code}',
                    province = '${province}', suburb = '${suburb}', email = '${email}', first_name = '${first_name}',last_name = '${last_name}'   where id = ${id} `;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) {
        console.log('This is the error::::****', error)
      };
      res.json(result);
    });
    connection.release();
  });
});



router.post("/createCart", (req, res) => {
  let cartDetails = req.body;
  let finalCart = [];
  let cartDetail = {};
  cartDetails.forEach(el => {
    cartDetail = {
      product_id: el.id,
      user_id: el.user_id,
      price: el.price,
      quantity: el.quantity,
      total: el.total,
      vat: el.vat,
      netAmount: parseFloat(el.total + el.vat).toFixed(2)
    };
    finalCart.push(cartDetail);
  });
  let mysql = `Insert into cart (product_id, user_id, price, quantity, total, vat, netAmount) values `;
  let mysql2 = "";

  finalCart.forEach((el, index) => {
    if (index === finalCart.length - 1) {
      mysql2 =
        mysql2 +
        `(${el.product_id},${el.user_id},${el.price},${el.quantity},${
          el.total
        },${el.vat},${el.netAmount})`;
    } else {
      mysql2 =
        mysql2 +
        `(${el.product_id},${el.user_id},${el.price},${el.quantity},${
          el.total
        },${el.vat},${el.netAmount}),`;
    }
  });
  mysql = mysql + mysql2;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      res.json(result);
    });
    connection.release();
  });
});

router.delete("/deleteCart/:id", (req, res) => {
  let id = parseInt(req.params.id);
  mysql = `delete from cart where user_id = ${id} and invoice_number is null`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      res.json(result);
    });
    connection.release();
  });
});

module.exports = router;
