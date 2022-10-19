import React, { useState } from "react";
import { NavLink } from "react-router-dom";


function NavBar({ user, setUser }) {
    const [ active, setActive ] = useState("");

    function handleClick(e) {
        setActive(e.target.value)
        if (e.target.value === "logout") {
            handleLogoutClick()
        }
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
    }

    return (
        <header>
            <p className="mastHead">Real Reviews</p>
            <nav id="navBar">
                <NavLink exact className="button" to="/">
                    <button onClick={handleClick} className={active === "Home" ? "active" : "other"} value="Home">Reviews</button>
                </NavLink>
                <NavLink exact className="button" to="/games">
                    <button onClick={handleClick} className={active === "games" ? "active" : "other"} value="games">Games</button>
                </NavLink>
                <NavLink exact className="button" to="/devs">
                    <button onClick={handleClick} className={active === "developers" ? "active" : "other"} value="developers">Developers</button>
                </NavLink>
                 <NavLink exact className="button" to="/new">
                    <button onClick={handleClick} className={active === "new" ? "active" : "other"} value="new">Create</button>
                </NavLink>
                <NavLink exact className="button" to="/profile">
                    <button onClick={handleClick} className={active === "profile" ? "active" : "other"} value="profile">Profile</button>
                </NavLink>
                <NavLink className="button" to="/">
                    <button className="logout" id="logoutButton" onClick={handleClick} value="logout">{user ? "Logout" : "Login"}</button>
                </NavLink>
            </nav>
        </header>
    )
}

export default NavBar;