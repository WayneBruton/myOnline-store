const express = require("express");
const router = express.Router();
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

let saltRounds = 10;

router.use((req, res, next) => {
  //   console.log("this is the body", req.body);
  let email = req.body.email;
  //   console.log(email);
  const schema = {
    email: Joi.string().email(),
    user_password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{6,32}$")),
    first_name: Joi.string(),
    last_name: Joi.string()
  };

  const { error, value } = Joi.validate(req.body, schema);
  if (error) {
    console.log("HELLO", error.details[0].context.key);
    // let err = error.details[0].context.key;
    switch (error.details[0].context.key) {
      case "email":
        res.status(400).send({
          error: "You must provide a valid email address"
        });
        break;
      case "user_password":
        res.status(400).send({
          error: `Password must have the following: <br>
          1. One lower case letter <br>
          2. One upper case letter <br>
          3. One number <br>
          4. More than 5 characters and less than 32`
        });
        break;
      case "first_name":
        res.status(400).send({
          error: "Names cannot be blank"
        });
        break;
      case "last_name":
        res.status(400).send({
          error: "Names cannot be blank"
        });
        break;
      default:
        res.status(400).send({
          error: "Invalid registration information"
        });
    }
  } else {
    next();
  }
});

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}

// let user = req.body;
//     let token = jwtSignUser(user)
//     console.log('Token is:', token)

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//         //   return res.json({
//         //     success: false,
//         //     message: 'Token is not valid'
//         //   });
//         console.log(err)
//         } else {
//         //   req.decoded = decoded;
//         //   next();
//         console.log('decoded token:',decoded)
//         }
//       });

router.post("/registerUser", (req, res, next) => {
  let user_password = req.body.user_password;
  // console.log(user_password)
  let mysql = "";
  bcrypt.hash(user_password, saltRounds, function(err, hash) {
    // console.log('this is the hash',hash)
    // mysql = `This is the hash: ${hash}`;
    mysql = `insert into users (first_name, last_name, email, user_password) values (
        '${req.body.first_name}', '${req.body.last_name}', '${
      req.body.email
    }', '${hash}'
    )`;
    console.log("******************");
    console.log(mysql);
    let mysql2 = `select * from users where email = '${req.body.email}'`;
    console.log("******************");
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log("ERR", err);
        connection.release();
        res.json({ error: "Error with connection" });
      }
      connection.query(mysql, function(error, result) {
        if (error) {
          return res.send({ error: "That email address is already in use." });
        }
        connection.query(mysql2, function(error, result) {
          if (error) {
            return res.send({ error: "That email address is already in use." });
          }
          console.log(result[0].id);
          let userJson = {
            id: result[0].id,
            email: result[0].email
          };
          console.log(userJson);
            res.json({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        });
      });
      connection.release();
    });
  });
  //   res.json({ message: "It works!!" });
});

//   res.send({
//     user: userJson,
//     token: jwtSignUser(userJson)
//   })

module.exports = router;
