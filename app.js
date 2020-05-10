const express = require("express");
const app = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');
app.locals.moment = require("moment");

const index = require("./routes/index");
const profile = require("./routes/profile");

mongoose
  .connect("mongodb://localhost:27017/webdxd", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connection failed");
  });

// pug views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//  resolve the static image cannot display
app.use(express.static("public"));

//Apply session middleware
app.use(session({
  secret: 'webdxd',
  resave: false,
  saveUninitialized: false,
  cookie:{secure: false}
}));

//Apply passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Config passport middleware
passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use((req,res,next)=>{
  res.locals.user= req.user;
  console.log(req.user);
  next();
});



app.use("/", index);
app.use("/profile", profile);

app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

//  error handling middleware
app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(3000, () => {
  console.log("listening port 3000");
});
