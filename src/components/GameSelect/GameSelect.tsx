import { useSelector } from "react-redux";
import { GameButton } from "../../styles/games";
import { useState } from "react";

const GameSelect = () => {
  const [selectedGame, setSelectedGame] = useState("Mega-sena");
  const gameData = useSelector((state) => state.game);

  return (
    <div>
      {gameData.types.map((item) => (
        <GameButton
          key={item.id}
          color={item.color}
          onClick={() => setSelectedGame(item.type)}
          style={{
            backgroundColor: `${
              selectedGame === item.type ? item.color : "inherit"
            }`,
            color: `${selectedGame === item.type ? "#FFF" : item.color}`,
          }}
        >
          {item.type}
        </GameButton>
      ))}
    </div>
  );
};
export default GameSelect;
