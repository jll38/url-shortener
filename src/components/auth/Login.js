import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { useState } from "react";
import { passwordStrength as passStrength } from "check-password-strength";
import Link from "next/link";
import { hashPassword } from "@/lib/authHandlers";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const handleLogin = async (e) => {
    setStatus(null);
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      console.log(res.status);

      return res.json().then((data) => {
        if (res.status === 200) {
          localStorage.setItem("JWT_X_AUTH", data.accessToken);
          window.location.reload();
        } else {
          setErrorMessage(data.message);
        }
      });
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <Link href="/register" className="-mt-4 hover:underline">
        Don&apos;t have an account?
      </Link>
      <br />
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
