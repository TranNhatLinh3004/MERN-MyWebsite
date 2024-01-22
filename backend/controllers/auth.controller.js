const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
var nodemailer = require("nodemailer");
const handleRegister = async (req, res) => {
  console.log(req.body);
  // const { email } = req.body;

  // User.findOne({ email: email }, (err, result) => {
  //   // console.log(result);
  //   console.log(err);
  //   if (result) {
  //     res.send({ message: "Email id is already register", alert: false });
  //   } else {
  //     const data = User(req.body);
  //     const save = data.save();
  //     res.send({ message: "Successfully sign up", alert: true });
  //   }
  // });
  const MIN_PASSWORD_LENGTH = 6; // Độ dài tối thiểu cho mật khẩu

  try {
    const oldUser = await User.findOne({ username: req.body.username });
    if (oldUser) {
      alert("User Already Exists");
      return res.status(400).json({ error: "User Already Exists" });
    }
    if (req.body.password.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .json({ error: "Password must have at least 6 characters" });
    }
    // console.log("imagePath", imagePath);

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      avatar: req.body.avatar,
    });

    const user = await newUser.save();
    return res.status(201).json(user); // 201 Created status for successful user creation
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const handleLogin = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json("Người dùng không tồn tại");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json("Mật khẩu không hợp lệ");
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
};
const handleResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email, "RESETPASS");
    const user = await User.findOne({ email });
    console.log(user, "USER");
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Gửi email chứa link đặt lại mật khẩu tới email người dùng
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "linhtran.it.3004@gmail.com",
        pass: "Vebenem3004",
      },
    });

    console.log(transporter, "Transport");
    const mailOptions = {
      from: "linhtran.it.3004@gmail.com",
      to: email,
      subject: "Reset Your Password",
      text: `Hi there! This is a test email.`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email: ", err);
      } else {
        console.log("Email sent: ", info);
        res
          .status(200)
          .json({ message: "Email sent with password reset instructions" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleRegister, handleLogin, handleResetPassword };
