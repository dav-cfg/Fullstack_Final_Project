const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Log JWT_SECRET status on startup (don't log the actual secret!)
console.log(`🔐 JWT_SECRET is ${process.env.JWT_SECRET ? 'SET via environment' : 'USING DEFAULT FALLBACK'}`);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    console.log("❌ No token provided in Authorization header");
    console.log("   Headers received:", Object.keys(req.headers));
    return res.sendStatus(401);
  }

  console.log("🔍 Token received (first 20 chars):", token.substring(0, 20) + "...");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("❌ JWT verification failed:", err.message);
      console.error("   Error type:", err.name);
      console.error("   Token format seems:", token.includes('.') ? 'valid (has dots)' : 'INVALID (no dots)');
      return res.sendStatus(401);
    }
    // decoded will have {id, username, role}
    req.user = decoded;
    console.log("✅ Authenticated user:", { id: decoded.id, username: decoded.username, role: decoded.role });
    next();
  });
}

module.exports = { authenticateToken };
