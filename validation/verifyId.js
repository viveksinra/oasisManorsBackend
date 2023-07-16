var mongoose = require('mongoose');
const verifyMongoId = async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({
        message:"incorrect id",
        variant: "error",
      });
    }
    next();
}

module.exports = { verifyMongoId };