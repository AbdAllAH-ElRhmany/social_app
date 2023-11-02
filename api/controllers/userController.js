const User = require("../models/User");

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      await user.save();
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      // url id is for friend
      // my id is at body
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(401).json("you already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};

exports.unfollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      // url id is for friend
      // my id is at body
      const user = await User.findById(req.params.id); // friend
      const currentUser = await User.findById(req.body.userId); // me
      if (currentUser.following.includes(req.params.id)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(401).json("you don't follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) =>
        User.findById(friendId).select({
          _id: 1,
          username: 1,
          profilePicture: 1,
        })
      )
    );
    // let friendList = [];
    // friends.map(friend=> {
    //   const
    // })
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
