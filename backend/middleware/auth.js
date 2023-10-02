const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    const token = await authHeaders.split(" ")[1];
    const decodedToken = await jwt.verify(token, "jwt-secret");
    const user = await decodedToken;

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({ message: "Not authorized" });
  }
};

module.exports = authorize;
