import jwt from 'jsonwebtoken';

export const user = jwt.decode(localStorage.getItem("JWT_X_AUTH"));

export function handleSignout(){
    try{
        localStorage.removeItem("JWT_X_AUTH");
        window.location.reload();
    } catch(e){
        console.error("Error signing out. Might wanna fix that")
    }
}