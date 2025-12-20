// src/utilities/index.js
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  try {
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle both id and _id from token, and support admin
    req.user = {
      id: decoded._id || decoded.id || "admin-id",
      username: decoded.username,
      role: decoded.role || "user",
    };
    
    console.log("✅ Authenticated user:", req.user);
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authenticateToken };
