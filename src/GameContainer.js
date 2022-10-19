import React from "react";
import GameCard from "./GameCard";

function GameContainer({ gameList }) {

  const renderGames = gameList.map((game)=> {
    return <GameCard key={game.id} game={game}/>
})

return (
    <div>
        <center id="gameTitleCard">Games</center>
        <center id="gamerCard">{renderGames}</center>
    </div>
)
}
export default GameContainer