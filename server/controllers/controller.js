// Controller functions come here
const { User } = require("../model/casaverdeModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../JWT-check");

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
      },
    });
    res.status(200).json({ message: "user been updated" });
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
module.exports = allControllers;
