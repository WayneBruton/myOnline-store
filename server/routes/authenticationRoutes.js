const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const bcrypt = require("bcryptjs");

let jwtSecret = process.env.JWT_SECRET;

let checktoken = (req, res, next) => {
  let token = req.body.token;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      res.json({
        success: false,
        message: "Token is not valid"
      });
      next();
    } else {
      return res.send({
        success: true,
        message: "Token is valid"
      });
    }
  });
};

router.put("/authenticate", checktoken, (req, res) => {});

module.exports = router;
