import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import EditPopUp from "./EditPopUp"
import DeletePopUp from "./DeletePopUp"

function ReviewCard({ review, user }) {
    const [editReviewChanger, setEditReviewChanger] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [gameId, setGameId] = useState()
    const [games, setGames] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [isShownnn, setIsShownnn] = useState(false)


const dateObj = new Date();
const day = dateObj.getUTCDate();
const month = dateObj.getUTCMonth() + 1;
const year = dateObj.getUTCFullYear();

const theDate = `${month}/${day}/${year}`

    
    const history = useHistory()

    function handleReviewDelete() {
        fetch(`/reviews/${review.id}`, { method: "DELETE" }).then((r) => {
            if (r.ok) {
              history.push("/");
            }
          });
    }

    useEffect(()=>{
        fetch("/games")
        .then(response => response.json())
        .then(data => setGames(data))
      }, [])

      const renderTheGames = games.map((game) => {
        return <option key={game.id} value={game.id}>{game.name}</option>
    })


function handleChangeEditReview() {
    setEditReviewChanger(prevState => !prevState)
}


function handleUpdateReview() {
    fetch(`/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: content,
            user_id: user.id,
            game_id: gameId,
            date: theDate
        }),
        }).then((r) => {
          r.json().then((review) => console.log(review));
        });
  }

function handleGameChange(e) {
setGameId(e.target.value)
}

function handleTitle(e) {
setTitle(e.target.value)
}

function handleReviewChange(e) {
    setContent(e.target.value)
}


return (
    <div id="reviewCard" >
        <div>
        <h1 id="gameName" >{review.game.name}</h1>
        <h2 id="reviewTitle">{review.title}</h2>
        <h3>{review.content}</h3>
        <h4>{review.date}</h4>
        <img id="reviewcardGame" alt="game" src={review.game.image} ></img>
        </div>
        <button 
        id="reviewCardEdit" 
        className="gameEditDelete" 
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        onClick={handleChangeEditReview} >✏️</button><form onSubmit={handleReviewDelete}><button id="reviewCardDelete" className="gameEditDelete"  onMouseEnter={() => setIsShownnn(true)}
        onMouseLeave={() => setIsShownnn(false)} type="submit">🗑️</button>
        </form>
        {editReviewChanger ? 
        <form onSubmit={handleUpdateReview}>
<label>Title   </label>
    <input onChange={handleTitle} type="text" name="title"  ></input>
    <label>Game   </label>
   <select onChange={handleGameChange}>
    <option>pick a game</option>
    {renderTheGames}
   </select>
    <label>Review   </label>
    <input onChange={handleReviewChange} type="text" name="content"></input>
<button type="submit">Submit</button>
        </form> : null}
        {isShown ? <EditPopUp /> : null}
        {isShownnn ? <DeletePopUp /> : null}
    </div>
)

}

export default ReviewCard