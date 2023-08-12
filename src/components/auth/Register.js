import { useState } from "react";
import { passwordStrength as passStrength } from "check-password-strength";
export default function Register() {
  const [password, setPassword] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({});

  function passwordCheck(event) {
    setPassword(event.target.value);
    const strengthID = passStrength(password).id;
    let message;
    switch (strengthID) {
      case 0:
        message = "Pathetic 😰";
        break;
      case 1:
        message = "Weak 😒";
        break;
      case 2:
        message = "Its ok... 🙄";
        break;
      case 3:
        message = "Strong 💪";
        break;
    }
    setPasswordStrength({
      id: strengthID,
      message: message,
    });
  }

  return (
    <form id="loginForm" autoComplete="off" className="w-full authForm">
      <label htmlFor="usernameInput" className="block">
        Username
      </label>
      <input
        id="usernameInput"
        type="text"
        className="block bg-white/50 rounded-lg"
      ></input>
      <label htmlFor="emailInput" className="block">
        Email
      </label>
      <input
        id="emailInput"
        type="email"
        className="block bg-white/50 rounded-lg"
      ></input>
      <label htmlFor="passwordInput" className="block">
        Password
      </label>
      <input
        id="passwordInput"
        type="password"
        className="block bg-white/50 rounded-lg"
        onChange={
          passwordCheck
        }
      ></input>
      <span class="help-block">{passwordStrength.message}</span>
      <label htmlFor="confirmPasswordInput" className="block">
        Confirm Password
      </label>
      <input
        id="confirmPasswordInput"
        type="password"
        className="block bg-white/50 rounded-lg"
      ></input>
      <button
        type="submit"
        className="bg-payne-gray text-white p-4 rounded-lg hover:bg-delft-blue transition-all duration-100"
      >
        Register
      </button>
    </form>
  );
}
