const Users = require("../models/User");
const httpStatusCodes = require("http-status-codes");
const BadRequestError = require("../errors/badRequestError");
const UnauthenticatedError = require("../errors/UnauthenticateError");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await Users.create({ name, email, password });
  const token = user.assignJWT();

  res
    .status(httpStatusCodes.CREATED)
    .json({ user: { name: user.name }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await Users.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.assignJWT();
  res.status(httpStatusCodes.OK).json({ user: { user: user.name }, token });
};

module.exports = { registerUser, loginUser };
