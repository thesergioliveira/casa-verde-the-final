const { verify } = require("jsonwebtoken");

const { User } = require("../model/casaverdeModel");
const middleware = {};
middleware.validator = async (req, res, next) => {
  //check User
  const userCheck = await User.findOne({ username: req.body.username });
  if (userCheck) {
    return res.status(400).send({ message: "This name is already been used" });
  }
  //check email
  const email = req.body.email;
  var regEx = /\S+@\S+\.\S+/;
  if (!regEx.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  //check password
  const pass = req.body.password;
  const passConf = req.body.passwordConf;

  if (pass !== passConf) {
    return res.status(400).json({ message: "false Password!, Try Again" });
  }
  next();
};
//check authentication

middleware.checkToken = async (req, res, next) => {
  // Take Bearer out

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[0];

    if (token == null)
      return res.status(401).json({ message: "invalid token" });

    verify(token, process.env.TOKEN_TEXT, (err, user) => {
      if (err) {
        return res.status(404).json({ auth: false, message: "token expired" });
      } else {
        req.id = user.id;
        next();
      }
    });
  }
};
middleware.allowAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);
  if (user.admin == undefined || user.admin == false) {
    return res.status(404).send({ message: "Not Allowed" });
  } else {
    console.log("Allowed");
    next();
  }
};
// handleUpload don't allow to upload when the value is null
middleware.handleUpdate = async (req, res, next) => {
  const newData = req.body;
  if (
    await Object.values(newData)
      .map((data) => data.length === 0)
      .includes(true)
  ) {
    return res
      .status(400)
      .json({ message: "Please fill out all the required fields" });
  }
  next();
};
module.exports = middleware;
