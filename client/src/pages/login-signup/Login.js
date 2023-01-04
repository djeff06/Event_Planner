import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/UseLogin";

import "./log-sign.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();

  const handelLogin = async () => {
    await login(email, password);
    
  };
  return (
    <div>
      <div className="login-form">
        <div className="form-box solid">
          <div> {error && <p className="text-rose-600">{error}</p>}</div>
          <form>
            <h1 className="login-text">Sign In</h1>
            <label>Email</label>
            <br></br>
            <input
              type="email"
              name="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="input"
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
              id="input"
              className="login-box"
              placeholder="Enter your password"
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
                value="LOGIN"
                onClick={handelLogin}
                className="login-btn"
              />
            
            {/* <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            /> */}
            <br></br>
            <br></br>
            <div id="crt" className="flex justify-end">
              Not registered ?
              <Link
                className="text-blue-700 hover:cursor-pointer pl-2 "
                to={"/signup"}
              >
                create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
