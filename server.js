const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const upload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

require('dotenv/config')

const cookieSession = require('cookie-session')

//bring all routes
const passwordAuth = require("./routes/api/v1/auth/passwordAuth");
const company = require("./routes/api/v1/company");
const community = require("./routes/api/v1/main/community");
// Addition
const addEmployee = require("./routes/api/v1/auth/addEmployee");
const enquiry = require("./routes/api/v1/public/enquiry");
// Enquiry
const prospect = require("./routes/api/v1/enquiry/prospect");

//passport 
// const passport = require("./services/passport")
const app = express();
//cookie
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:['akjsdfkjk']
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(upload({ useTempFiles: true }));
app.use(cors());

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyparser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client/build")))


//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(db , { useFindAndModify: false, useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.log(err));

  //import Models
  require("./Models/User")

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);
require('./services/passport')


//actual routes
app.use("/api/v1/auth/passwordAuth", passwordAuth);
app.use("/api/v1/company", company);
app.use("/api/v1/main/community", community);
// Addition
app.use("/api/v1/auth/addEmployee", addEmployee);
app.use("/api/v1/public/enquiry", enquiry);
// Enquiry
app.use("/api/v1/enquiry/prospect", prospect);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 2040;

app.listen(port, () => console.log(` App is running at ${port}`));

