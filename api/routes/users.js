const router = require("express").Router();
const userController = require("../controllers/userController");

// Update User
router.put("/:id", userController.updateUser);

// Delete User
router.delete("/:id", userController.deleteUser);

// Get a User
router.get("/:id", userController.getUser);

// Get Followers
router.get("/friends/:userId", userController.getFriends);

// Follow a User
router.put("/:id/follow", userController.follow);

// Unfollow a User
router.put("/:id/unfollow", userController.unfollow);

module.exports = router;
