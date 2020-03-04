const jwt = require("jsonwebtoken");

/* This middleware validates token */

// next <-- allows to proceed requset process
module.exports = (req, res, next) => {
  // OPTIONS <-- in REST this use for check server availability
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization // Bearer <TOKEN>
      .split(" ")[1]; // Parse token

    if (!token) {
      return res.status(401).json("Not authorized");
    }

    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decrypted;

    next();
  } catch (e) {
    return res.status(401).json("Not authorized");
  }
};
