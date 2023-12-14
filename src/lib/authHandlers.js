import jwt from 'jsonwebtoken';

export function getUser() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("JWT_X_AUTH");
    return token ? jwt.decode(token) : null;
  }
  return null;
}

export function handleSignout() {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem("JWT_X_AUTH");
            window.location.reload();
        } catch(e) {
            console.error("Error signing out. Might wanna fix that");
        }
    }
}
