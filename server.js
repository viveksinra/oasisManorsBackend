const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const upload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require('dotenv/config')
const cookieSession = require('cookie-session')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//bring all routes
const fileupload = require("./routes/api/v1/other/fileupload");
//bring all routes
const passwordAuth = require("./routes/api/v1/auth/passwordAuth");
const company = require("./routes/api/v1/company");
// main
const community = require("./routes/api/v1/main/community");
const addSeat = require("./routes/api/v1/main/seat/addSeat");
const getSeat = require("./routes/api/v1/main/seat/getSeat");
// Addition
const addUser = require("./routes/api/v1/auth/addUser");
const enquiry = require("./routes/api/v1/public/enquiry");
// Enquiry
const addProspect = require("./routes/api/v1/enquiry/prospect/addProspect");
const getProspect = require("./routes/api/v1/enquiry/prospect/getProspect");
const moveToResidence = require("./routes/api/v1/enquiry/prospect/moveToResidence");
// Residence
const getResidence = require("./routes/api/v1/residence/getResidence");

// Health
const addHealth = require("./routes/api/v1/enquiry/health/addHealth");
const getHealth = require("./routes/api/v1/enquiry/health/getHealth");
// Contact
const addContact = require("./routes/api/v1/enquiry/contact/addContact");
const getContact = require("./routes/api/v1/enquiry/contact/getContact");
// Task
const addTask = require("./routes/api/v1/enquiry/task/addTask");
const getTask = require("./routes/api/v1/enquiry/task/getTask");
// Notes
const addNote = require("./routes/api/v1/enquiry/note/addNote");
const getNote = require("./routes/api/v1/enquiry/note/getNote");
// Compliance
const addCompliance = require("./routes/api/v1/enquiry/compliance/addCompliance");
const getCompliance = require("./routes/api/v1/enquiry/compliance/getCompliance");
// Employee
const addEmployee = require("./routes/api/v1/employee/basic/addEmployee");
const getEmployee = require("./routes/api/v1/employee/basic/getEmployee");

// Document validation
const addDocument = require("./routes/api/v1/employee/document/addDocument");
const getDocument = require("./routes/api/v1/employee/document/getDocument");
// Document validation
const addProfile = require("./routes/api/v1/employee/profile/addProfile");
const getProfile = require("./routes/api/v1/employee/profile/getProfile");
//Residence 

const addResMed = require("./routes/api/v1/residence/resMed/addResMed");
const getResMed = require("./routes/api/v1/residence/resMed/getResMed");

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
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
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
app.use("/api/v1/other/fileupload", fileupload);

//actual routes
app.use("/api/v1/auth/passwordAuth", passwordAuth);
app.use("/api/v1/company", company);
app.use("/api/v1/main/community", community);
// main
app.use("/api/v1/main/community", community);
app.use("/api/v1/main/seat/addSeat", addSeat);
app.use("/api/v1/main/seat/getSeat", getSeat);
// Addition
app.use("/api/v1/auth/addUser", addUser);
app.use("/api/v1/public/enquiry", enquiry);
app.use("/api/v1/enquiry/prospect/moveToResidence", moveToResidence);
// Enquiry
app.use("/api/v1/enquiry/prospect/addProspect", addProspect);
app.use("/api/v1/enquiry/prospect/getProspect", getProspect);
// Residence
app.use("/api/v1/residence/getResidence", getResidence);
// Health
app.use("/api/v1/enquiry/health/addHealth", addHealth);
app.use("/api/v1/enquiry/health/getHealth", getHealth);
// Contact
app.use("/api/v1/enquiry/contact/addContact", addContact);
app.use("/api/v1/enquiry/contact/getContact", getContact);
// Task
app.use("/api/v1/enquiry/task/addTask", addTask);
app.use("/api/v1/enquiry/task/getTask", getTask);
// Notes
app.use("/api/v1/enquiry/note/addNote", addNote);
app.use("/api/v1/enquiry/note/getNote", getNote);
// Compliance
app.use("/api/v1/enquiry/compliance/addCompliance", addCompliance);
app.use("/api/v1/enquiry/compliance/getCompliance", getCompliance);
// Employee
app.use("/api/v1/employee/basic/addEmployee", addEmployee);
app.use("/api/v1/employee/basic/getEmployee", getEmployee);
// Document validation
app.use("/api/v1/employee/document/addDocument", addDocument);
app.use("/api/v1/employee/document/getDocument", getDocument);
// profilen
app.use("/api/v1/employee/profile/addProfile", addProfile);
app.use("/api/v1/employee/profile/getProfile", getProfile);
// residence 
app.use("/api/v1/residence/resMed/addResMed", addResMed);
app.use("/api/v1/residence/resMed/getResMed", getResMed);


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

