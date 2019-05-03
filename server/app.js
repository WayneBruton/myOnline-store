const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
app = express();
// const session = require("express-session");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

if (port === 3000) {
    const dotenv = require('dotenv').config();
}

app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());



const  storeRoutes = require("../server/routes/store"),
  authorizationRoutes = require("../server/routes/authorizationRoutes");

app.use(storeRoutes);
app.use(authorizationRoutes);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
