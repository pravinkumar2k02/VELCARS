const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  //Checking if user already exists
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) return res.status(400).send("Email already exists");

  //Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Registering new user
  const user = await new User({
    ...req.body,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => {
      //Create and assign a token
      const token = jwt.sign(
        { _id: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.SECRET_TOKEN
      );
      res.header("auth-token", token).send(token);
    })
    .catch((err) => res.status(500).send(err));
};

exports.login = async (req, res) => {
  //Checking if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  //Checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign(
    { _id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.SECRET_TOKEN
  );
  res.header("auth-token", token).send(token);
};

exports.changePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  const user = await User.findOne({ _id: userId });
  if (user) {
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    User.findByIdAndUpdate(userId, {password: hashedPassword})
    .then(() => res.status(200).send("Password changed successfully"))
    .catch((err) => res.status(500).send(err));
  }
  // console.log(user);
  console.log(userId, newPassword);
};
