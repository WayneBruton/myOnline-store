const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const bcrypt = require("bcryptjs");
const fs = require('fs')

// const saltRounds = process.env.SALT_ROUNDS;
const saltRounds = 10



router.post("/contact", (req, res) => {
    let response = {
      success: "Your Email has been sent!",
      failure: "There was a problem, please try again later"
    };
    // res.send(response.success)

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let message = req.body.message;
    const output = `
      <p>You have a new contact request</p>
      <br>
      <h3>Contact Details</h3>
      <ul>
          <li>First Name: ${firstname}</li><br>

          <li>Last Name: ${lastname}</li><br>
  
          <li>Email Address: ${email}</li><br>
          
      </ul><br><br>
      <h3 style="font-weight: bold;">Message</h3><br>
      <p>${message}</p>
      `;
   console.log(output)
    let transporter = nodemailer.createTransport({
      host: process.env.MAILHOST,
      port: 465, //587
  
      secure: true,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
                                                 
      // var mailOptions = {
      //   from: "Boredom Busters Contact Form <donnae@boredombusters.co.za>", // sender address                                   
      //   to: "waynebruton@icloud.com, boredombusters01@gmail.com", // list of receivers                                 
      //   subject: `Boredom Busters Contact Form`, // Subject line                                                 
      //   text: "Hello world?", // plaintext body                                                 
      //   html: output, // html body                                               
      //     attachments: [
      //         {
      //             filename: 'Invoice-48.pdf', 
      //             path: 'public/files/Invoice-48.pdf',                                        
      //             contentType: 'application/pdf'
      //         }]
      // };
    
  
    let mailOptions = {
      from: "Boredom Busters Contact Form <donnae@boredombusters.co.za>",
      to: "waynebruton@icloud.com, boredombusters01@gmail.com",
      subject: `Boredom Busters Contact Form`,
      text: "Hello world?",
      html: output
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(response.failure)
      } else {
        res.send(response.success)
      } 
    });
  
  });

  router.put("/resetPasswordLink", (req, res) => {
    // console.log(req.body.email)

    // res.send({body: req.body.email})
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
        if (!result.length) {
          return res.send({error: 'No such email on our database.'})
        }
        let resetEmail = cryptr.encrypt(JSON.stringify(req.body.email))
        // console.log(resetEmail)
        let resetURL = `${process.env.RESET_URL}/${resetEmail}`
        //SEND EMAIL TO CLIENT

        let response = {
          success: "Your Email has been sent!",
          failure: "There was a problem, please try again later"
        };
        // res.send(response.success)
    
        // let firstname = req.body.firstname;
        // let lastname = req.body.lastname;
        let email = req.body.email;
        // let message = req.body.message;
        const output = `
          <p>You have a new contact request</p>
          <br>
          <h3>RESET EMAIL</h3>
           <h4>Email Address: ${email}</h4><br>
           <p>To reset your email click the following link
           <a href="${resetURL}">RESET</a></p><br>
           <p>or copy ${resetURL} into your browser</p><br>
           <p>If you did not try to reset your password, please ignore this email</P>
          <br><br>
          <p></strong>The Boredom Busters Team</strong></P>`;
       console.log(output)
        let transporter = nodemailer.createTransport({
          host: process.env.MAILHOST,
          port: 465, //587
      
          secure: true,
          auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
          },
          tls: {
            rejectUnauthorized: false
          }
        });
      
        let mailOptions = {
          from: "Boredom Busters Contact Form <donnae@boredombusters.co.za>",
          to: "waynebruton@icloud.com, boredombusters01@gmail.com",
          subject: `Boredom Busters Reset Password Form`,
          text: "Hello world?",
          html: output
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.send(response.failure)
          } else {
            res.send(response.success)
          } 
        });
      });
      connection.release();
    });
  });

  router.get("/resetPasswordStart/:uri", (req, res) => {
    let uri = req.params.uri
    uri = JSON.parse(cryptr.decrypt(uri))
    res.send({uri: uri})
  });
  
  router.put("/resetPassword", (req, res) => {
    let user_password = req.body.password
    if (req.body.password !== req.body.passwordRepeat) {
      return res.send({issues: "Passwords do not match"})
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      let mysql = `update users set user_password = '${hash}' where email = '${req.body.email}'`
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          resizeBy.send("Error with connection");
        }
        connection.query(mysql, function(error, result) {
          if (error) {
            res.send({error: "There was a connection error"})
          };
          res.json(result);
        });
        connection.release();
      });
    })
    // res.send({itWorks: "AWESOME"})
  });


  
  module.exports = router;