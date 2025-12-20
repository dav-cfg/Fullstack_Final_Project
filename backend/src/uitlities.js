const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("❌ No token provided in Authorization header");
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("❌ JWT verification failed:", err.message);
      return res.sendStatus(401);
    }
    // decoded will have {id, username, role}
    req.user = decoded;
    console.log("✅ Authenticated user:", { id: decoded.id, username: decoded.username, role: decoded.role });
    next();
  });
}

module.exports = { authenticateToken };
