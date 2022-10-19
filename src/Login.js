import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <center><p className="mastHead">Real Reviews</p></center>
      {showLogin ? (
        <>
          <LoginForm setUser={setUser} />
          <br />
          <center id="signupSection">
            Don't have an account? &nbsp;
            <button id="signUp" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </center>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} />
          <br />
          <center>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </center>
        </>
      )}
    </div>
  );
}

export default Login;