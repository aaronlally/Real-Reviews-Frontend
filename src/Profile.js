import React, { useState } from "react";

function Profile({ user, setUser }) {


    const [updateForm, setUpdateForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [showReviews, setShowReviews] = useState(false)

    const reviewShower = () => setShowReviews(prevState => !prevState)

function renderNoReviews() {
  if (user.reviews.length === 0) {
    return <h3 id="noReviews">add reviews and view them here!</h3>
  }
  else {
    return renderReviews
  }
}
  const renderReviews = user.reviews.map((review) => {
    return (
     <div id="hellaButtonIds">
      <h3 id="profileReviews" >{review.content}</h3>
      </div>
    )
  })


    function handleUpdateUser() {
        setUpdateForm(prevState => !prevState)
      }

      function handleSubmitUpdateUser() {
    fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
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
            });
        }


    function handleDeleteUser() {
        console.log(user)
        fetch(`/users/${user.id}`, { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }


    return (
        <div id="profile">
            <center id="profilee">Profile</center>
            <h2 id="usaname">Username:</h2>
            <h2 id="usersname">{user.username}</h2>
            <h2 id="firstname">First name</h2>
            <h2 id="firstName">{user.first_name}</h2>
            <h2 id="lastname">Last Name</h2>
            <h2 id="lastName">{user.last_name}</h2>
            <button className="profileButtons" id="profileb2" onClick={handleUpdateUser}>Edit account</button> <button id="profileb1" className="profileButtons" onClick={handleDeleteUser}>Delete account</button>
            {updateForm ? 
      <form onSubmit={handleSubmitUpdateUser}>
      <label htmlFor="first_name">* First Name</label>
      <input
        type="text"
        id="first"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
       <label htmlFor="last_name">* Last Name</label>
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
      <button type="submit">{isLoading ? "Loading..." : "Update"}</button>
  </form> : null}
  <button id="profileReviewButton" onClick={reviewShower}>My reviews</button>
  {showReviews ? renderNoReviews() : null}
        </div>
    )
}

export default Profile;