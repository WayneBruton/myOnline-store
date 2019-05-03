const express = require("express");
const router = express.Router();
const pool = require("./connection");
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const axios = require("axios");

router.get("/products", (req, res) => {
    console.log('HELLO')
    let mysql = "select * from products where available = true";
    pool.getConnection(function(err, connection) {
      if (err) {
          console.log('ERR', err)
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        result.forEach(el => {
          el.product_image = `http://localhost:3000${el.product_image}`
          el.product_description = el.product_description.substring(0, 150) + '...'
          el.price = el.price.toFixed(2)
        });
        res.json(result);
      });
      connection.release();
    });
  });

router.get("/product/:id", (req, res) => {
  let id = req.params.id;
    // console.log('HELLO')
    let mysql = `select * from products where id = ${id}`;
    pool.getConnection(function(err, connection) {
      if (err) {
          console.log('ERR', err)
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        result.forEach((el) => {
          el.product_image = `http://localhost:3000${el.product_image}`
          el.price = el.price.toFixed(2)
        })
        console.log('This is the result', result)

        res.json(result);
      });
      connection.release();
    });
  });


  module.exports = router;