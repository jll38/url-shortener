import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { useState } from "react";
import { passwordStrength as passStrength } from "check-password-strength";
import Link from "next/link";
import { hashPassword } from "@/lib/authHandlers";
export default function Register() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({});
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordStrength: passwordStrength.id,
        confirmPassword
      }),
    })
      .then((res) => {
        if (res.status === 200) window.location.assign("/login");
        else return res.json();
      })
      .then((data) => {
        setErrorMessage(data.message);
      });
  };

  function passwordCheck(event) {
    setPassword(event.target.value);
    const strengthID = passStrength(password).id;
    let message;
    let color;
    switch (strengthID) {
      case 0:
        message = "Pathetic 😰";
        color = "bg-red-600";
        break;
      case 1:
        message = "Weak 😒";
        color = "bg-orange-600";
        break;
      case 2:
        message = "Its ok... 🙄";
        color = "bg-yellow-600";
        break;
      case 3:
        message = "Strong 💪";
        color = "bg-green-600";
        break;
    }
    setPasswordStrength({
      id: strengthID,
      message: message,
      color: color,
    });
  }
  return (
    <form
      id="loginForm"
      autoComplete="off"
      className="w-full authForm text-payne-gray"
    >
      <label htmlFor="usernameInput" className="block">
        Name
      </label>
      <input
        id="usernameInput"
        type="text"
        placeholder="Enter name"
        className="block bg-white/50 rounded-lg"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
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
        onChange={passwordCheck}
      ></input>
      <div name="password-strength" className="text-sm -mt-4 mb-4">
        Password Strength:
        <div name="strength-bar" className="flex gap-2">
          <div
            className={`h-[5px] w-[40px] ${
              passwordStrength.id >= 0 && password !== null
                ? passwordStrength.color
                : "bg-payne-gray"
            }`}
          ></div>
          <div
            className={`h-[5px] w-[40px] ${
              passwordStrength.id >= 1 && password !== null
                ? passwordStrength.color
                : "bg-payne-gray"
            }`}
          ></div>
          <div
            className={`h-[5px] w-[40px] ${
              passwordStrength.id >= 2 && password !== null
                ? passwordStrength.color
                : "bg-payne-gray"
            }`}
          ></div>
          <div
            className={`h-[5px] w-[40px] ${
              passwordStrength.id >= 3 && password !== null
                ? passwordStrength.color
                : "bg-payne-gray"
            }`}
          ></div>
        </div>
        <span class="help-block">{passwordStrength.message}</span>
      </div>
      <label htmlFor="confirmPasswordInput" className="block ">
        Confirm Password
      </label>
      <input
        id="confirmPasswordInput"
        type="password"
        placeholder="Re-enter your password"
        className="block bg-white/50 rounded-lg"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      ></input>
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <Link href="/login" className="-mt-4 hover:underline">
        Have an account?
      </Link>
      <br />
      <button
        type="submit"
        className="bg-payne-gray text-white p-4 rounded-lg hover:bg-delft-blue transition-all duration-100"
        onClick={registerUser}
      >
        Register
      </button>
    </form>
  );
}
