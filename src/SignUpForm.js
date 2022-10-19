import React, { useState } from "react";
// import Error from "./styles"

function SignUpForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    // setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }),
    }).then((r) => {
      setIsLoading(false);
      r.json().then((user) => setUser(user));
    //   if (r.ok) {
    //     r.json().then((user) => setUser(user));
    //   } else {
    //     r.json().then((err) => setErrors(err.errors));
    //   }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <center>
      <h2>Sign up</h2>
        <label className="floatLabel" htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
         <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        {/* <textarea>
            {errors.map((err) => {(
          <Error key={err}>{err}</Error>
        )})}
        </textarea> */}
        </center>
    </form>
  );
}

export default SignUpForm;