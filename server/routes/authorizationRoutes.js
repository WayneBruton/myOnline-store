const express = require("express");
const router = express.Router();
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

// const saltRounds = process.env.SALT_ROUNDS;
const saltRounds = 10

router.use((req, res, next) => {
  const schema = {
    email: Joi.string().email(),
    user_password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{6,32}$")),
    first_name: Joi.string(),
    last_name: Joi.string()
  };

  const { error, value } = Joi.validate(req.body, schema);
  if (error) {
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

router.post("/registerUser", (req, res, next) => {
  let user_password = req.body.user_password;
  let mysql = "";
  bcrypt.hash(user_password, saltRounds, function(err, hash) {
    mysql = `insert into users (first_name, last_name, email, user_password) values (
        '${req.body.first_name}', '${req.body.last_name}', '${
      req.body.email
    }', '${hash}'
    )`;
    let mysql2 = `select * from users where email = '${req.body.email}'`;
    pool.getConnection(function(err, connection) {
      if (err) {
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
          let userJson = {
            id: result[0].id,
            username: result[0].first_name,
            email: result[0].email
          };
          res.header("Authorization", "Bearer" + jwtSignUser(userJson));
          res.json({
            user: userJson,
            token: jwtSignUser(userJson)
          });
        });
      });
      connection.release();
    });
  });
});

router.put("/checkEmail", (req, res) => {
  let mysql = `select email from users where email = '${req.body.email}'`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) {
        res.send({ error: "There is an error, try again later" })
      };
      res.json(result);
      console.log(result)
    });
    connection.release();
  });
});

router.put("/login", (req, res) => {
  let user_password = req.body.user_password;
  let mysql = `select * from users where email = '${req.body.email}'`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      res.json({ error: "Error with connection. Are you online?" });
    }
    connection.query(mysql, function(error, result) {
      if (error) {
        res.json({ error: "No such user" });
      } else {
        if (!result.length) {
          res.json({
            error: `No user registered under "${req.body.email}", try signup and register as a user.`
          });
        } else {
          let hash = result[0].user_password;
          let userJson = {
            id: result[0].id,
            email: result[0].email
          };
          bcrypt.compare(user_password, hash, function(err, response) {
            if (response) {
              res.json({
                user: userJson,
                username: result[0].first_name,
                token: jwtSignUser(userJson)
              });
            } else {
              res.json({
                error: "Password is incorrect. Please try again"
              });
            }
          });
        }
      }
    });
    connection.release();
  });
});



module.exports = router;
