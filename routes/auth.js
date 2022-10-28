const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { mailTransport, generateEmailTemplate } = require("../utils/mail");
const User = require("../models/User");

const router = require("express").Router();

//REGISTER / SIGNUP
router.post("/signup", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    mailTransport().sendMail({
      from: "nazz202022@outlook.com",
      to: savedUser.email,
      subject: "Thank you for using our services",
      html: generateEmailTemplate(savedUser.username),
    });

    return res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json("Wrong Username");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword &&
      res.status(401).json("Wrong Password!");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
