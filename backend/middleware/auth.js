const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'airplane-junior-test-secret-change-in-production';

/**
 * Express middleware that verifies the JWT in the Authorization header.
 * Expects: Authorization: Bearer <token>
 * Attaches req.user = { id, email } on success.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
