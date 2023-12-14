// app/middleware/auth.js
import jwt from 'jsonwebtoken';

export default function authMiddleware(req) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return new Response(null, { status: 401 });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user; // Attach user info to request object
    console.log(req.user)
  } catch (error) {
    return new Response(null, { status: 403 });
  }
}
