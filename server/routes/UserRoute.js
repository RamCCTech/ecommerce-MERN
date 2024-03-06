const { getUserById } = require("../controllers/UserController");
const router = require("express").Router();

router.get("/:userId", getUserById);

module.exports = router;
