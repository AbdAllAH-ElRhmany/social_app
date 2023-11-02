const router = require("express").Router();
const postController = require("../controllers/postController");

// Create Post
router.post("/", postController.createPost);

// Update Post
router.put("/:id", postController.updatePost);

// Delete Post
router.delete("/:id", postController.deletePost);

// Get a Post
router.get("/:id", postController.getPost);

// Get timeline Posts
router.get("/timeline/:userId", postController.timeline);

// Like/Dislike a Post
router.put("/:id/like", postController.likePost);

// Get users's Posts
router.get("/profile/:userId", postController.getUserPosts);

module.exports = router;
