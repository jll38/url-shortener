import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { useState } from "react";
import { passwordStrength as passStrength } from "check-password-strength";

import { hashPassword } from "@/lib/authHandlers";
export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => {
      if(!res.ok){
        throw res
      }
    });
  };

  return (
    <form
      id="loginForm"
      autoComplete="off"
      className="w-full authForm text-payne-gray"
    >
      <label htmlFor="emailInput" className="block">
        Email
      </label>
      <input
        id="emailInput"
        type="email"
        placeholder="Enter email (e.g john@doe.com)"
        className="block bg-white/50 rounded-lg"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label htmlFor="passwordInput" className="block">
        Password
      </label>
      <input
        id="passwordInput"
        type="password"
        className="block bg-white/50 rounded-lg"
        placeholder="Enter password"
        onChange={(e) => {setPassword(e.target.value)}}
      ></input>
      <button
        type="submit"
        className="bg-payne-gray text-white p-4 rounded-lg hover:bg-delft-blue transition-all duration-100"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
}
