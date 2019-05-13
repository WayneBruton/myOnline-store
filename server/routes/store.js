const express = require("express");
const router = express.Router();
const pool = require("./connection");

const IMG_URL = process.env.IMG_URL

router.get("/products", (req, res) => {
  let mysql = "select * from products where available = true";
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      result.forEach(el => {
        el.product_image = `${IMG_URL}${el.product_image}`;
        el.product_description =
          el.product_description.substring(0, 150) + "...";
        el.price = el.price.toFixed(2);
      });
      res.json(result);
    });
    connection.release();
  });
});

router.get("/product/:id", (req, res) => {
  let id = req.params.id;
  let mysql = `select * from products where id = ${id}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      result.forEach(el => {
        el.product_image = `${IMG_URL}${el.product_image}`;
        el.price = el.price.toFixed(2);
      });
      res.json(result);
    });
    connection.release();
  });
});

module.exports = router;
