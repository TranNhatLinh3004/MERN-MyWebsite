const router = require("express").Router();

const {
  handleGetUser,
  handleUpdateUser,
} = require("../controllers/user.controller");

//get
router.get("/:id", handleGetUser);

//update
router.put("/:username", handleUpdateUser);

// //delete
// router.delete("/:id", handleDeleteUser);

module.exports = router;
