const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    return res.status(401).json({message: "Invalid token" });
  }
};

module.exports = verifyToken;
