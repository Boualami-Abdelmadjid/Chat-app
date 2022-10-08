const {
  register,
  login,
  setAvatar,
  getContacts,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getContacts/:id", getContacts);

module.exports = router;
