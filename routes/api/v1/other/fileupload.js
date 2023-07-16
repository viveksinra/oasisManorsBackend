var express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

var cloudinary = require("cloudinary").v2;

// @type    POST
//@route    /api/v1/other/fileupload/upload
// @desc    route for SAVING data for chapter
// @access  PRIVATE
app.post("/upload", function(req, res, next) {
  // console.log(req.files.photo);
  const file = req.files.photo;
  // console.log(file);
  cloudinary.uploader.upload(file.tempFilePath,{ public_id: `oasisApi/${file.md5}`,
  overwrite: false},   function(err, result) {
    if(err){console.log(err)}
    res.json({ result });
  });
});


// // @type    POST
// //@route    /api/other/fileupload/upload
// // @desc    route for SAVING data for chapter
// // @access  PRIVATE
// app.post("/upload", function(req, res, next) {
//   // console.log(req.files.photo);
//   const file = req.files.photo;
//   // console.log(file);
//   cloudinary.uploader.upload(file.tempFilePath,{ public_id: `questions/${file.md5}`,
//   overwrite: false},  function(err, result) {
//     console.log(result)
//     console.log(err)
//     res.json({ result });
//   });
// });



app.post("/delete", function(req, res, next) {
  // console.log(req.files.photo);
  const pId = req.body.public_id;
  // console.log(file);
  cloudinary.uploader.destroy(pId,  function(err, result) {
    // console.log("Error: ", err);
    t = result.result;
    res.json({ message: "Deleted Succesfully ",
    variant: "success" });
  });
});

///////////////////////////////////////////////////////////
// Adding photot to specefic folder

// // @type    POST
// //@route    /api/other/fileupload/upload/folder/userImage
// // @desc    route for SAVING data for chapter
// // @access  PRIVATE
app.post("/folder/userImage", function(req, res, next) {
  // console.log(req.files.photo);
  const file = req.files.photo;
  // console.log(file);
  cloudinary.uploader.upload(file.tempFilePath,{ public_id: `userImage/${file.md5}`,
  overwrite: false},  function(err, result) {
    if(err){console.log(err)}
    res.json({ result });
  });
});
module.exports = app;
