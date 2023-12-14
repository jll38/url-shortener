// app/routes/api/protected.js

export async function POST({ request }) {
  
  return new Response(JSON.stringify(userData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
