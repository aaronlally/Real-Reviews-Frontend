import './App.css';
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import GameContainer from "./GameContainer";
import DevContainer from "./DevContainer";
import Profile from "./Profile";
import AddStuff from "./AddStuff"

// highest level component
function App() {

const [user, setUser] = useState(null);
const [reviewList, setReviewList] = useState([])
const [gameList, setGameList] = useState([])
const [devList, setDevList] = useState([])

// fetch devs; will run useEffect whenever devList.length changes
useEffect(()=>{
  fetch("/developers")
  .then(response => response.json())
  .then(data => setDevList(data))
}, [devList.length])

// fetch games; will run useEffect whenever gameList.length changes
useEffect(()=>{
    fetch("/games")
    .then(response => response.json())
    .then(data => setGameList(data))
  }, [gameList.length])

// adds newly created game fron addStuff component to the gameList array in POST request
  function handleAddGame(newGame) {
    setGameList([...gameList, newGame])
  }
    
// fetch reviews; will run useEffect whenever reviewList.length changes
    useEffect(()=>{
        fetch("/reviews")
        .then(response => response.json())
        .then(data => setReviewList(data))
      }, [reviewList.length])

      // add review to reviewList array from addStuff POST request
      function handleAddReview(newReview) {
        setReviewList([...reviewList, newReview])
    }


useEffect(() => {
  // auto-login
  fetch("/me").then((r) => {
    if (r.ok) {
      r.json().then((user) => setUser(user));
    }
  });
}, []);
// if user does not exist render Login component
if (!user) return <Login setUser={setUser} />;

// adds newly created developer from addStuff component POST request to devList
function handleAddDeveloper(newDev) {
setDevList([...devList, newDev])
}

// routes
  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/login">
            <Login setUser={setUser}/>
        </Route>
        <Route exact path="/">
            <Home user={user} reviewList={reviewList} />
        </Route>
        <Route exact path="/games">
            <GameContainer gameList={gameList}/>
        </Route>
        <Route exact path="/devs">
            <DevContainer devList={devList}/>
        </Route>
        <Route exact path="/profile">
            <Profile user={user} setUser={setUser} />
        </Route>
        <Route exact path="/new">
            <AddStuff handleAddDeveloper={handleAddDeveloper} handleAddGame={handleAddGame} handleAddReview={handleAddReview} user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;