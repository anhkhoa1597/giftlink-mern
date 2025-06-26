import User from "../models/user.js";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  PasswordMismatchError,
} from "../middlewares/errorHandler.js";
import logger from "../utils/logger.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/tokenUtils.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    logger.info("Fetched all users");
    res.json(users);
  } catch (err) {
    logger.error("Error fetching users", { stack: err.stack });
    next(err);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, "-password");
    if (!user) {
      throw new NotFoundError("User not found");
    }
    logger.info(`Fetched user with id ${req.params.userId}`);
    res.json(user);
  } catch (err) {
    logger.error(`Error fetching user by id ${req.params.userId}`, {
      stack: err.stack,
    });
    next(err);
  }
};

// Get current user
export const getMe = async (req, res, next) => {
  try {
    console.log("req user", req.user);
    const user = await User.findById(req.user.userId, "-password");
    if (!user) {
      throw new NotFoundError("User not found");
    }
    logger.info("Fetch Info User successfully");
    res.json({ message: "Fetch Info User Successfully", user });
  } catch (error) {
    logger.error("Error fetching information of user", { stack: error.stack });
    next(error);
  }
};

// Register new user
export const register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      throw new ValidationError(
        "All fields (email, password, confirmPassword, firstName, lastName) are required"
      );
    }

    if (password !== confirmPassword) {
      throw new ValidationError("Passwords do not match");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError("User with this email already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await user.save();

    const token = generateToken({ userId: user._id, email: user.email });

    logger.info(`User created: ${user.email}`);
    res.status(201).json({
      message: "User registered",
      token,
      user,
    });
  } catch (err) {
    logger.error("Error registering user", { stack: err.stack });
    next(err);
  }
};

// Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken({ userId: user._id, email: user.email });
    logger.info(`User logged in: ${user.email}`);
    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    logger.error("Error logging in user", { stack: error.stack });
    next(error);
  }
};

// Logout
export const logoutUser = async (req, res, next) => {
  try {
    logger.info(`User ${req.user.email} Logout successful`);
    res.json({ message: "User Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const updateUserName = async (req, res, next) => {
  try {
    const { lastName } = req.body;
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.lastName = lastName;
    await user.save();

    logger.info("User Name updated", { userId, newName: lastName });
    res.json({
      message: "User Name updated successfully",
      userId,
      lastName,
    });
  } catch (error) {}
};

// Update password
export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new ValidationError(
        "All fields (old password, new password confirm new password) are required"
      );
    }

    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw new PasswordMismatchError("Old password does not match");
    }

    if (newPassword !== confirmPassword) {
      throw new ValidationError("Passwords do not match");
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    logger.info("Password updated", { userId, email: user.email });
    res.json({
      message: "Password updated successfully",
      userId,
      email: user.email,
    });
  } catch (err) {
    logger.error("Error updating password", { stack: err.stack });
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    logger.info(`User deleted: ${req.params.userId}`);
    res.json({ message: `User with id ${req.params.userId} deleted` });
  } catch (err) {
    logger.error(`Error deleting user ${req.params.userId}`, {
      stack: err.stack,
    });
    next(err);
  }
};
