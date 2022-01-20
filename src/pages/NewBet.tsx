import PrivateRoutesLayout from "../components/PrivateRoutesLayout/PrivateRoutesLayout";
import { AddToCartButton, BottomButton, NewBetTitle } from "../styles/games";
import { P } from "../styles/ui";
import { useSelector } from "react-redux";
import Cart from "../components/Cart/Cart";
import { GameButton } from "../styles/games";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getGameData } from "../services/api";
import { getData } from "../redux/gameSlice";
import { addItem } from "../redux/cartSlice";
import TableNumbers from "../components/TableNumbers/TableNumbers";

import { useState, useEffect } from "react";
const NewBet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getGameData().then((response) => dispatch(getData(response)));
  }, [dispatch]);

  const gameData = useSelector((state) => state.game);
  const [selectedGame, setSelectedGame] = useState("Mega-Sena");
  const arr: number[] = new Array(gameData.types[0].range).fill(0);
  const [selNumbers, setSelNumbers] = useState<number[]>([]);
  const addToCart = () => {
    if (selNumbers.length === gameData.types[0].max_number) {
      dispatch(
        addItem({
          id: Math.floor(Math.random() * 10),
          gameName: gameData.types[0].type,
          price: gameData.types[0].price,
          color: gameData.types[0].color,
          bet: selNumbers,
        })
      );
      setSelNumbers([]);
    } else {
      alert("Complete seu jogo");
    }
  };
  const addToArr = (e: any) => {
    if (
      selNumbers.length < gameData.types[0].max_number &&
      !selNumbers.includes(Number(e.currentTarget.value))
    ) {
      e.currentTarget.style.backgroundColor = gameData.types[0].color;
      let value = Number(e.currentTarget.value);
      setSelNumbers((prevState) => [...prevState, value]);
    } else if (selNumbers.includes(Number(e.currentTarget.value))) {
      const newArr = selNumbers.filter(
        (item) => item !== Number(e.currentTarget.value)
      );
      e.currentTarget.style.backgroundColor = "#adc0c4";
      setSelNumbers(newArr);
    } else {
      alert("Quantidade máxima de números atingida");
    }
  };

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
          <div>
            <P italic={true} bold={true} fontSize={17}>
              Fill your bet
            </P>
            <P style={{ marginTop: 10 }} italic={true} fontSize={17}>
              {gameData.types[0].description}
            </P>
            <TableNumbers
              arr={arr}
              color={gameData.types[0].color}
              func={addToArr}
            />
            <div className="bottomButtons">
              <BottomButton>Complete Game</BottomButton>
              <BottomButton>Clear Game</BottomButton>
              <AddToCartButton onClick={addToCart}>
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
