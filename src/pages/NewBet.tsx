import PrivateRoutesLayout from "../components/PrivateRoutesLayout/PrivateRoutesLayout";
import {
  AddToCartButton,
  BottomButton,
  NewBetTitle,
  NumberButton,
} from "../styles/games";
import { P } from "../styles/ui";
import { useSelector } from "react-redux";
import Cart from "../components/Cart/Cart";
import GameSelect from "../components/GameSelect/GameSelect";
import { AiOutlineShoppingCart } from "react-icons/ai";
const NewBet = () => {
  const gameData = useSelector((state) => state.game);
  const arr: number[] = new Array(gameData.types[0].range).fill(0);

  return (
    <PrivateRoutesLayout>
      <div style={{ display: "flex" }}>
        <section className="gameArea">
          <NewBetTitle>
            NEW BET <span>FOR GAMENAME</span>
          </NewBetTitle>
          <P italic={true} bold={true} fontSize={17}>
            Choose a game
          </P>
          <div style={{ marginTop: 20, marginBottom: 28 }}>
            <GameSelect />
          </div>
          <div>
            <P italic={true} bold={true} fontSize={17}>
              Fill your bet
            </P>
            <P style={{ marginTop: 10 }} italic={true} fontSize={17}>
              {gameData.types[0].description}
            </P>
            <table>
              {arr.map((item, index) => (
                <NumberButton color={gameData.types[0].color}>
                  {index + 1}
                </NumberButton>
              ))}
            </table>
            <div className="bottomButtons">
              <BottomButton>Complete Game</BottomButton>
              <BottomButton>Clear Game</BottomButton>
              <AddToCartButton>
                <AiOutlineShoppingCart className="icon" />
                Add to cart
              </AddToCartButton>
            </div>
          </div>
        </section>
        <section className="cartArea">
          <Cart />
        </section>
      </div>
    </PrivateRoutesLayout>
  );
};

export default NewBet;
