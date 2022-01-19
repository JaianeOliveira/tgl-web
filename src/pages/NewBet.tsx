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
import { useDispatch } from "react-redux";
import { getGameData } from "../services/api";
import { getData } from "../redux/gameSlice";
import TableNumbers from "../components/TableNumbers/TableNumbers";

import { useState, useEffect } from "react";
const NewBet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getGameData().then((response) => dispatch(getData(response)));
  }, [dispatch]);

  const gameData = useSelector((state) => state.game);
  const arr: number[] = new Array(gameData.types[0].range).fill(0);
  const [cart, setCart] = useState<{ values: number[] }[]>([
    {
      values: [1, 2, 3, 4, 5, 6, 7],
    },
  ]);
  const [selNumbers, setSelNumbers] = useState<number[]>([]);

  const addToArr = (e: any) => {
    if (
      selNumbers.length < gameData.types[0].max_number &&
      !selNumbers.includes(Number(e.currentTarget.value))
    ) {
      // sel.push(Number(e.currentTarget.value));
      // console.log(sel);
      e.currentTarget.style.backgroundColor = gameData.types[0].color;
      let value = Number(e.currentTarget.value);
      setSelNumbers((prevState) => [...prevState, value]);
      console.log("arr", selNumbers);
    } else if (selNumbers.includes(Number(e.currentTarget.value))) {
      const newArr = selNumbers.filter(
        (item) => item !== Number(e.currentTarget.value)
      );
      e.currentTarget.style.backgroundColor = "#adc0c4";
      setSelNumbers(newArr);
      console.log(selNumbers);
    } else {
      console.log("array cheio");
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
            <GameSelect />
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
              <AddToCartButton
                onClick={() => {
                  // isso não funciona
                  setCart((prevState) => [
                    ...prevState,
                    {
                      values: selNumbers,
                    },
                  ]);
                  setSelNumbers([]);
                  console.log(cart);
                }}
              >
                <AiOutlineShoppingCart className="icon" />
                Add to cart
              </AddToCartButton>
            </div>
          </div>
        </section>
        <section className="cartArea">
          <Cart />
          <div>
            {cart.map((item) => (
              <p>{item.values}</p>
            ))}
          </div>
        </section>
      </div>
    </PrivateRoutesLayout>
  );
};

export default NewBet;
