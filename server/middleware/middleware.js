import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_TOKEN;
export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied, no token provided" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid token" });
    }
  };