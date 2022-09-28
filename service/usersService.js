const { User } = require("../schemas/User");
const bcrypt = require("bcrypt");
const { UnauthorizedError } = require("../errors/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError("Email or password is wrong");
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.AUTH_SECRET
    );
    user.token = token;
    user.save();
    return { user, token };
  } catch (error) {
    throw new UnauthorizedError("Email or password is wrong");
  }
};

module.exports = { login };
