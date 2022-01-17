import { useSelector } from "react-redux";
import { GameButton } from "../../styles/games";
const GameSelect = (props: any) => {
  const gameData = useSelector((state) => state.game);
  return (
    <div>
      {gameData.types.map((item) => (
        <GameButton key={item.id} color={item.color}>
          {item.type}
        </GameButton>
      ))}
    </div>
  );
};
export default GameSelect;
