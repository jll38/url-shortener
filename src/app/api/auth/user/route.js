// app/routes/api/protected.js
import authMiddleware from '../../middleware/middleware';

export async function POST({ request }) {
  const authResult = authMiddleware(request);
  if (authResult instanceof Response) {
    return authResult; // If auth failed, it returns a Response object
  }

  // Continue with your logic for the authenticated user
  // If the middleware did not return, it means the token is valid
  const userData = { /* ... */ }; // Fetch user data based on `request.user` set by middleware

  return new Response(JSON.stringify(userData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
