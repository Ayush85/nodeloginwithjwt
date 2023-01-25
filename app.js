const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./dbconn");
const passport = require('passport');
const session = require('express-session');
const multer  = require('multer')
const upload = multer()

dotenv.config();
const app = express();

// bodyparser
app.use(bodyparser.json());
app.use(cors());

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, UPDATE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  const port = process.env.PORT || 3000;

db.connect((err) => {
  err
    ? console.log("db connection failed ...")
    : console.log("db connection success ..");
});


// router path
const routes = require("./routes/router");
app.get("/",(req,res,next) => {
  res.send("hello world");
});

app.use("/api",upload.none(), routes);

app.use("*", (req, res) => {
    res.status(400).json({ error: "Invalid Request URL" });
  });
// server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running on port ${port}....`);
});
