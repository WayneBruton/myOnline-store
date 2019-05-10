const express = require("express");
const router = express.Router();
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);

router.get("/deliveryDetails/:id", (req, res) => {
  // console.log("testing");
  // console.log("This is the body", req.params.id);
  // console.log("This is the body", req.params.id);
  let mysql = `select * from users where id = ${req.params.id}`;
  // res.json({yes: 'It works'})
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log("ERR", err);
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
    connection.release();
  });
});

router.put("/updateDelivery", (req, res) => {
  // console.log("testing123456");
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
      if (error) throw error;
      res.json(result);
    });
    connection.release();
  });
});

router.put("/successURL", (req, res) => {
  // console.log("testing123456");

  // console.log("This is the body", req.body);
  let successURL = cryptr.encrypt(JSON.stringify(req.body));
  let decrypted = cryptr.decrypt(successURL);
  // console.log("*************************************");
  // console.log("Encrypted", successURL);
  // console.log("DECRYPTED", JSON.parse(decrypted));
  // console.log("*************************************");
  res.json({ successURL: successURL });
});

router.get("/successResponse/:pfast", (req, res) => {
 
  let successURL = req.params.pfast
  // console.log("This is the param", req.params.pfast);
  // let successURL = cryptr.encrypt(JSON.stringify(req.body));
  let decrypted = cryptr.decrypt(successURL);
  let info = JSON.parse(decrypted)
  mysql = `select first_name, last_name from users where id = ${info.id}`
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      let sending = {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        amount_paid: info.finalAmount
      }
      res.json(sending);
    });
    connection.release();
  });
});

router.post("/createCart", (req, res) => {
  console.log('THIS IS THE CART BODY',req.body);
  // res.send({itWords: 'AWESOME!!!'})
  let cartDetails = req.body
  let finalCart = []
  let cartDetail = {}
  cartDetails.forEach(el => {
    cartDetail = {
      product_id: el.id,
      user_id: el.user_id,
      price: el.price,
      quantity: el.quantity,
      total: el.total,
      vat: el.vat,
      netAmount: parseFloat(el.total + el.vat).toFixed(2)
    }
    finalCart.push(cartDetail)
  });
  console.log('THE FINAL CART',finalCart)
  let mysql = `Insert into cart (product_id, user_id, price, quantity, total, vat, netAmount) values `
  let mysql2 = ""
  
  finalCart.forEach((el, index) => {
    if (index === finalCart.length - 1) {
      mysql2 =
        mysql2 +
        `(${el.product_id},${el.user_id},${el.price},${
          el.quantity
        },${el.total},${el.vat},${el.netAmount})`;
    } else {
      mysql2 =
        mysql2 +
        `(${el.product_id},${el.user_id},${el.price},${
          el.quantity
        },${el.total},${el.vat},${el.netAmount}),`;
    }
  });
  mysql = mysql + mysql2
  console.log(mysql)
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
  console.log('THIS IS THE USER ID',id)
  // res.send({itWorks: 'AWESOME'})
  mysql = `delete from cart where user_id = ${id} and invoice_number is null`
  console.log(mysql)
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
