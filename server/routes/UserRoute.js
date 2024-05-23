const {
  getUserById,
  setUserFavorite,
  getUserFavorite,
  removeUserFavorite,
} = require("../controllers/UserController");
const router = require("express").Router();

router.get("/:userId", getUserById);
router.post("/:userId/favorite", setUserFavorite);
router.get("/:userId/favorite", getUserFavorite);
router.delete("/:userId/favorite", removeUserFavorite);

module.exports = router;
