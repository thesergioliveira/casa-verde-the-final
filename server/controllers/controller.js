// Controller functions come here
const { User } = require("../model/casaverdeModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../JWT-check");
const { sign, verify } = require("jsonwebtoken");
const _ = require("lodash");
const mailGun = require("mailgun-js");
var API_KEY = "3e876f711c37a032dbbd53cda52d4322-adf6de59-aafd2d92";
var DOMAIN = "sandbox1b67686ac8ac4900a41f0214726a4b26.mailgun.org";
const mg = mailGun({ apiKey: API_KEY, domain: DOMAIN });

const allControllers = {};

// Add new User
allControllers.addUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      admin: req.body.admin,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      houseNumber: req.body.houseNumber,
      postalCode: req.body.postalCode,
      resetLink: {},
    });

    await user.save();
    res.status(201).json({ message: "New user being added ✅", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET all users
allControllers.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(err.message).json({ message: err.message });
  }
};

// Login
allControllers.login = async (req, res) => {
  let username = req.body.username;
  let email = req.body.username;
  let password = req.body.password;
  const user =
    (await User.findOne({ username })) || (await User.findOne({ email }));
  if (user == null) {
    return res.status(404).json({ message: "Cannot find user" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = createToken(user);
      await res.status(200).json({
        auth: true,
        token,
        user: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      });
    } else {
      res.json({
        message: "Not Allowed, please check your username or password",
      });
    }
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
// deleteUser
allControllers.deleteUser = async (req, res) => {
  const user = await User.findById(req.id);
  let password = req.headers.pass;
  try {
    if (await bcrypt.compare(password, user.password)) {
      await User.findByIdAndDelete(req.id);
      res.status(200).json({ message: "this user been deleted" });
    } else {
      res.status(400).json({ message: "false Password please repeat !" });
    }
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
//getOneByID

allControllers.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    res.json({ auth: "true", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// update userInfos
allControllers.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.id, {
      $set: {
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        houseNumber: req.body.houseNumber,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        postalCode: req.body.postalCode,
      },
    });
    res.status(200).json({ message: "user been updated" });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
//update user Address
allControllers.updateAddress = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.id, {
      $set: {
        address: req.body.address,
        houseNumber: req.body.houseNumber,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        postalCode: req.body.postalCode,
      },
    });
    res.status(200).json({ message: "user address been updated" });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
// change password
allControllers.updatePassword = async (req, res) => {
  let password = req.body.password;
  let newPassword = req.body.NewPassword;
  let passwordConf = req.body.passwordConf;
  if (newPassword !== passwordConf) {
    return res
      .status(400)
      .json({ message: "your confirmation password failed ,please repeat" });
  }
  let _id = req.id;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await User.findById({ _id });
  try {
    if (await bcrypt.compare(password, user.password)) {
      await User.findByIdAndUpdate(req.id, {
        $set: {
          password: hashedPassword,
        },
      });
      res.status(200).json({ message: "your password been changed" });
    } else {
      res.status(400).json({
        message: "Not Allowed, please check your password",
      });
    }
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
// test landing page
allControllers.getDate = async (req, res) => {
  res.status(200).json(req.id);
};


//forget password
allControllers.forgotPassword = async (req, res) => {
  const email = req.body.email;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "user with this email does not exist" });
    }
    const token = sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });
    console.log(token);
    const data = {
      from: "noreply@hello.com",
      to: email,
      subject: "Reset Your Password",
      html: `<h2>Please click on given link to reset your password</h2
      <p>${process.env.CLIENT_URL}/resetPassword/${token}</p>`,
    };
    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "reset password link error" });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.status(400).json({ error: "Cannot sent" });
          }
          return res.status(200).json({
            message: "Email has been sent ,kindly follow the instructions",
          });
        });
      }
    });
  });
};
//reset password
allControllers.resetPassword = async (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "Incorrect token or it is expired" });
      }
    });
    User.findOne({ resetLink }, async (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ error: "user with this token does not exist" });
      }
      const hashedPassword = await bcrypt.hash(newPass, 10);
      const obj = { password: hashedPassword };
      user = _.extend(user, obj);
      user.save();
      res.status(200).json({ message: "Your password has been changed" });
    });
  } else {
    return res.status(401).json({ error: "Authentication error!!!" });
  }
};
module.exports = allControllers;
