const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    // Validations from express-validator
    check("email", "Incorrect email").isEmail(),
    check("password", "Password must have minimum 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // console.log(req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
          message: "Invalid email or password",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "This user already exists!" });
      }

      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      // Wait response from DB
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (e) {
      // HTTP error
      res.status(500).json({ message: "Something wrong. Try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Incorrect password").exists(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid email or password",
        });
      }

      const { email, password } = req.body;

      // Find user by email in DB
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswdMatch = await bcrypt.compare(password, user.password);
      if (!isPasswdMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token, userId: user.id });
    } catch (e) {
      // HTTP error
      res.status(500).json({ message: "Something wrong. Try again" });
    }
  }
);

module.exports = router;
