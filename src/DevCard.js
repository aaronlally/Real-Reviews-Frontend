import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import EditPopUp from "./EditPopUp"
import DeletePopUp from "./DeletePopUp"

function DevCard({ dev }) {

    const history = useHistory()
    const [showEditDev, setShowEditDev] = useState(false)

    const [devName, setDevName] = useState("")
    const [devYear, setDevYear] = useState()
    const [isShown, setIsShown] = useState(false)
    const [isShownnn, setIsShownnn] = useState(false)

const renderGames = dev.games.map((game) => {
    return <h3 key={game.id}>{game.name}</h3>
})

function handleEditDev() {
setShowEditDev(prevState => !prevState)
}

function handleDevDelete(e) {
    e.preventDefault()
    fetch(`/developers/${dev.id}`, { method: "DELETE" }).then((r) => {
        if (r.ok) {
          history.push("/devs");
        }
      });
}

function handleSubmitEditDev() {
    fetch(`/developers/${dev.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: devName,
            founding_year: devYear
        }),
        }).then((r) => {
          r.json().then((review) => console.log(review));
        });
}

function handleEditDevName(e) {
    setDevName(e.target.value)
}

function handleEditDevYear(e) {
setDevYear(e.target.value)
}

return (
    <div id="devCard">
        <h1>{dev.name}</h1>
        <h2>{dev.founding_year}</h2>
        <div>{renderGames}</div>
        <button id="devCardEdit" className="gameEditDelete" onClick={handleEditDev} onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} >✏️</button>
        <form onSubmit={handleDevDelete}><button id="devCardDelete" className="gameEditDelete" type="submit" onMouseEnter={() => setIsShownnn(true)}
  onMouseLeave={() => setIsShownnn(false)} >🗑️</button>
        </form>
        {showEditDev ? <form onSubmit={handleSubmitEditDev}>
            <label>Name</label>
            <input onChange={handleEditDevName} type="text"></input>
            <label>Founding Year</label>
            <input onChange={handleEditDevYear} type="number"></input>
            <button type="submit">Submit</button>
        </form> : null}
        {isShown ? <EditPopUp /> : null}
        {isShownnn ? <DeletePopUp /> : null}
    </div>
)
}

export default DevCard