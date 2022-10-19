import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import EditPopUp from "./EditPopUp"
import DeletePopUp from "./DeletePopUp"

function GameCard({ game }) {

    const [editGameButton, setEditGameButton] = useState(false)
    const [gameName, setGameName] = useState("")
    const [gameYear, setGameYear] = useState()
    const [gameGenre, setGameGenre] = useState("")
    const [multiplayer, setMultiplayer] = useState(true)
    const [gameImage, setGameImage] = useState("")
    const [gamePlatform, setGamePlatform] = useState("")
    const [gameDev, setGameDev] = useState()
    const [devs, setDevs] = useState([])
    const [currentGame, setCurrentGame] = useState(game)
    const history = useHistory()
    const [isShown, setIsShown] = useState(false)
    const [isShownnn, setIsShownnn] = useState(false)


    useEffect(()=>{
        fetch("/developers")
        .then(response => response.json())
        .then(data => setDevs(data))
      }, [devs.length])
  
      const renderDevs = devs.map((dev) => {
        return <option key={dev.id} value={dev.id}>{dev.name}</option>
      })

    function handleClick() {
        setEditGameButton(prevState => !prevState)
    }

    function handleGameNameChange(e) {
        setGameName(e.target.value)
        console.log(e.target.value)
      }
      
      function handleYearChange(e) {
        setGameYear(e.target.value)
        console.log(e.target.value)
      }
      
      function handleGenreNameChange(e) {
        setGameGenre(e.target.value)
        console.log(e.target.value)
      }
      
      function handlePlatform(e) {
        setGamePlatform(e.target.value)
        console.log(e.target.value)
      }
      
      function handleMultiplayer(e) {
        setMultiplayer(e.target.value)
        console.log(e.target.value)
      }
      
      
      function handleDevelopersChange(e) {
        setGameDev(e.target.value)
        console.log(e.target.value)
      }
      
      function handleImage(e) {
        setGameImage(e.target.value)
        console.log(e.target.value)
      }

      function handleUpdateGame() {
        fetch(`/games/${game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: gameName,
                release_year: gameYear,
                genre: gameGenre,
                multiplayer: multiplayer,
                image: gameImage,
                platform: gamePlatform,
                developer_id: gameDev
            }),
            }).then((r) => {
              r.json().then((game) => setCurrentGame(game));
              console.log(currentGame)
            });
      }

      function handleDeleteGame() {
      fetch(`/games/${game.id}`, { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setCurrentGame(null);
          history.push("/");
        }
      });
    }

return (
    <div id="gameCard">
      <div id="cardImg">
        <img id="gameCardImg" alt="game" src={game.image} ></img>
        </div>
        <h1 id="gameCardName">{game.name}</h1>
        <h2 className="devName">{game.developer.name}</h2>
        <h3>{game.release_year}</h3>
        <h4>{game.multiplayer ? "multiplayer" : "single-player"}</h4>
        <button 
        id="gameCardEditButton" 
        className="gameEditDelete"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        onClick={handleClick}>✏️</button>
        {editGameButton ? 
        <form className="form" onSubmit={handleUpdateGame}>
            <label>Title</label>
<input onChange={handleGameNameChange} type="text" name="name"></input>
<label>Release Year</label>
<input onChange={handleYearChange} type="number" name="releaseYear"></input>
<label>Genre</label>
<input onChange={handleGenreNameChange} type="text" name="genre"></input>
<label>Platform</label>
<input onChange={handlePlatform} type="text" name="platform"></input>
<label>Image</label>
<input onChange={handleImage} type="text" name="image"></input>
<label>Multiplayer?</label>
<select onChange={handleMultiplayer}>
  <option>Pick an option</option>
  <option value={true}>True</option>
  <option value={false}>False</option>
</select>
<label>Developer</label>
<select onChange={handleDevelopersChange}>
  <option>Pick a Developer</option>
  {renderDevs}</select>
  <button type="submit">Submit</button>
</form> : null}
<form onSubmit={handleDeleteGame}>
<button 
  id="gameCardDeleteButton" 
  className="gameEditDelete" 
  onMouseEnter={() => setIsShownnn(true)}
  onMouseLeave={() => setIsShownnn(false)}
type="submit">🗑️</button>
</form>
{isShown ? <EditPopUp /> : null}
{isShownnn ? <DeletePopUp /> : null}
    </div>
)

}

export default GameCard