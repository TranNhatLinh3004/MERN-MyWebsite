const User = require("../models/user");
// const bcrypt = require("bcrypt");

// get user
const handleGetUser = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const user = await User.findOne({ username });

    const { ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
const handleUpdateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { newUsername, newEmail } = req.body; // Assuming you send the updated data in the request body

    // Find the user by username and update their data
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { username: newUsername, email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...other } = updatedUser._doc; // Exclude password from response
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  handleGetUser,
  handleUpdateUser,
};
