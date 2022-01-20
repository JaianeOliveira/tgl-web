import PrivateRoutesLayout from '../components/PrivateRoutesLayout/PrivateRoutesLayout';
import {
  AddToCartButton,
  BottomButton,
  NewBetTitle,
  NumberButton,
} from '../styles/games';
import { P } from '../styles/ui';
import { useSelector } from 'react-redux';
import Cart from '../components/Cart/Cart';
import { GameButton } from '../styles/games';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { getGameData } from '../services/api';
import { getData } from '../redux/gameSlice';
import { addItem } from '../redux/cartSlice';
import TableNumbers from '../components/TableNumbers/TableNumbers';

import { useState, useEffect } from 'react';
import { GameInfo } from '../types/type';
import { useNavigate } from 'react-router-dom';

const NewBet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.game);
  const [selectedGame, setSelectedGame] = useState<GameInfo | undefined>(
    gameData.types.find((item) => item.type === 'Mega-Sena')
  );
  const [selNumbers, setSelNumbers] = useState<number[]>([]);

  const clearGame = () => {
    setSelNumbers([]);
  };

  const completeGame = () => {
    if (!selectedGame) return;
    console.log({ n: selectedGame.max_number });
    const newArr = [...selNumbers];
    while (newArr.length < selectedGame?.max_number) {
      const newNumber =
        Math.floor(Math.random() * (selectedGame.range - 1)) + 1;
      if (!newArr.includes(newNumber)) {
        newArr.push(newNumber);
      }
    }
    console.log(newArr);
    setSelNumbers(newArr);
  };

  const addToCart = () => {
    if (selNumbers.length === selectedGame?.max_number) {
      dispatch(
        addItem({
          id: new Date().getTime(),
          gameName: selectedGame.type,
          price: selectedGame.price,
          color: selectedGame.color,
          bet: selNumbers,
        })
      );
      setSelNumbers([]);
    } else {
      alert('Complete seu jogo');
    }
  };

  const addToArr = (e: any) => {
    if (!selectedGame) return;
    if (
      selNumbers.length < selectedGame.max_number &&
      !selNumbers.includes(Number(e.currentTarget.value))
    ) {
      // e.currentTarget.style.backgroundColor = selectedGame.color;
      const value = Number(e.currentTarget.value);
      setSelNumbers((prevState) => [...prevState, value]);
    } else if (selNumbers.includes(Number(e.currentTarget.value))) {
      const newArr = selNumbers.filter(
        (item) => item !== Number(e.currentTarget.value)
      );
      // e.currentTarget.style.backgroundColor = '#adc0c4';
      setSelNumbers(newArr);
    } else {
      alert('Quantidade máxima de números atingida');
    }
  };

  useEffect(() => {
    console.log({ selNumbers });
  }, [selNumbers]);

  if (!selectedGame) {
    return (
      <>
        <P>Ops, algo deu errado!</P>

        {navigate('/home')}
      </>
    );
  }

  return (
    <PrivateRoutesLayout>
      <div style={{ display: 'flex' }}>
        <section className="gameArea">
          <NewBetTitle>
            NEW BET <span>FOR {selectedGame?.type}</span>
          </NewBetTitle>
          <P italic={true} bold={true} fontSize={17}>
            Choose a game
          </P>
          <div style={{ marginTop: 20, marginBottom: 28 }}>
            {gameData.types.map((item) => (
              <GameButton
                key={item.id}
                color={item.color}
                onClick={() => setSelectedGame(item)}
                style={{
                  backgroundColor: `${
                    selectedGame?.type === item.type ? item.color : 'inherit'
                  }`,
                  color: `${
                    selectedGame?.type === item.type ? '#FFF' : item.color
                  }`,
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
              {
                gameData.types.find((item) => item.type === selectedGame?.type)
                  ?.description
              }
            </P>
            <table>
              <tbody>
                <tr>
                  {[...new Array(selectedGame?.range)].map((item, index) => (
                    <NumberButton
                      key={index + 1}
                      value={index + 1}
                      color={selectedGame?.color}
                      selected={selNumbers.includes(index + 1)}
                      onClick={addToArr}
                    >
                      {index + 1 + 1}
                    </NumberButton>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="bottomButtons">
              <BottomButton onClick={completeGame}>Complete Game</BottomButton>
              <BottomButton onClick={clearGame}>Clear Game</BottomButton>
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
