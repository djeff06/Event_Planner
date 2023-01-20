import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/UseSignup";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, isLoading, signup } = useSignup();

  const handleSignup = async () => {
    await signup(username, email, password, confirmPassword);
  };
  return (
    <div>
      <div className="login-form">
        <div className="form-box solid">
          <div> {error && <p className="text-rose-600">{error}</p>}</div>
          <form>
            <h1 className="login-text">Sign Up</h1>
            <label>Username</label>
            <br></br>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="login-box"
              placeholder="Enter your Username"
            />
            <label>Email</label>
            <br></br>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="login-box"
              placeholder="Enter your Email"
            />
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="login-box"
              placeholder="Choose your password"
            />
            <br></br>
            <input
              type="password"
              name="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="login-box"
              placeholder="Confirm your password"
            />

            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 "
              required=""
            />

            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              Remember me
            </label>
            <br></br>
            <br></br>
            <input
              disabled={isLoading}
              type="submit"
              value="SIGNUP"
              onClick={handleSignup}
              className="login-btn"
            />
            <br></br>
            <br></br>
            <div id="crt" className="flex justify-end">
              I already have an account !
              <Link
                className="text-blue-700 hover:cursor-pointer pl-2 "
                to={"/login"}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}