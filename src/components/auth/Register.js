import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { useState } from "react";
import { passwordStrength as passStrength } from "check-password-strength";
export default function Register() {
  const [password, setPassword] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({});
  const [confirmPassword, setConfirmPassword] = useState(null);
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
    console.log(strengthID)
  }

  function confirmPasswordHandler(event){
    const confirm = event.target.value;
    setConfirmPassword(confirm === password)
  }
  return (
    <form
      id="loginForm"
      autoComplete="off"
      className="w-full authForm text-payne-gray"
    >
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
              passwordStrength.id >=2 && password !== null
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
        className="block bg-white/50 rounded-lg"
        onChange={confirmPasswordHandler}
      ></input>
      {confirmPassword && <span>{confirmPassword ? ("Matching!") : ("Password does not match")}</span> //Work on this
      }
      <button
        type="submit"
        className="bg-payne-gray text-white p-4 rounded-lg hover:bg-delft-blue transition-all duration-100"
      >
        Register
      </button>
    </form>
  );
}
