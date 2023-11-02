const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 4,
      max: 24,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 60,
    },
    city: {
      type: String,
      max: 60,
    },
    from: {
      type: String,
      max: 60,
    },
    relationship: {
      type: Number,
      enum: [1, 2],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.on("findOneAndUpdate", async function () {
  console.log(this);
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.correctPassword = async (
  candidatePassword,
  userPassowrd
) => {
  return await bcrypt.compare(candidatePassword, userPassowrd);
};

module.exports = mongoose.model("User", UserSchema);
