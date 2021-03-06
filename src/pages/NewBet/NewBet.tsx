import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertError,
  AlertWarning,
  PrivateRoutesLayout,
  Cart,
} from '../../components';
import { addItem } from '../../redux/cartSlice';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GameInfo } from '../../types/type';
import {
  AddToCartButton,
  BottomButton,
  NewBetTitle,
  NumberButton,
  GameButton,
} from '../../styles/games';
import { P } from '../../styles/ui';

const NewBet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.game);
  const { cart } = useSelector((state) => state.cart);
  const [selectedGame, setSelectedGame] = useState<GameInfo | undefined>(
    gameData.types.find((item) => item.type === 'Mega-Sena')
  );
  const [selNumbers, setSelNumbers] = useState<number[]>([]);

  const clearGame = () => {
    setSelNumbers([]);
  };

  const completeGame = () => {
    if (!selectedGame) return;
    const newArr = [...selNumbers];
    while (newArr.length < selectedGame?.max_number) {
      const newNumber =
        Math.floor(Math.random() * (selectedGame.range - 1)) + 1;
      if (!newArr.includes(newNumber)) {
        newArr.push(newNumber);
      }
    }
    setSelNumbers(newArr);
  };

  const addToCart = () => {
    if (
      selNumbers.length === selectedGame?.max_number &&
      !cart.some(
        (cartItem) =>
          cartItem.bet.every((item) => selNumbers.includes(item)) &&
          cartItem.gameName === selectedGame.type
      )
    ) {
      dispatch(
        addItem({
          id: new Date().getTime(),
          game_id: selectedGame.id,
          gameName: selectedGame.type,
          price: selectedGame.price,
          color: selectedGame.color,
          bet: selNumbers.sort((a, b) => a - b),
        })
      );
      setSelNumbers([]);
    } else if (
      cart.some(
        (cartItem) =>
          cartItem.bet.every((item) => selNumbers.includes(item)) &&
          cartItem.gameName === selectedGame?.type
      )
    ) {
      AlertError('You already made that bet.');
    } else {
      AlertWarning('Complete your game.');
    }
  };

  const addToArr = (e: any) => {
    if (!selectedGame) return;

    if (selNumbers.includes(Number(e.currentTarget.value))) {
      setSelNumbers(
        selNumbers.filter((item) => item !== Number(e.currentTarget.value))
      );
    } else if (
      selNumbers.length < selectedGame.max_number &&
      !selNumbers.includes(Number(e.currentTarget.value))
    ) {
      const value = Number(e.currentTarget.value);
      setSelNumbers((prevState) => [...prevState, value]);
    } else {
      AlertError('Maximum amount reached');
    }
  };

  useEffect(() => {
    if (!selectedGame) {
      navigate('/home');
    }
  }, [navigate, selectedGame]);

  return (
    <PrivateRoutesLayout>
      <div className="newBet_page">
        <section className="gameArea">
          <NewBetTitle>
            NEW BET <span>FOR {selectedGame?.type}</span>
          </NewBetTitle>
          <P italic={true} bold={true} fontSize={1.7}>
            Choose a game
          </P>
          <div style={{ marginTop: 20, marginBottom: 28 }}>
            {gameData.types.map((item) => (
              <GameButton
                key={item.id}
                color={item.color}
                onClick={() => {
                  setSelectedGame(item);
                  setSelNumbers([]);
                }}
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
            <P italic={true} bold={true} fontSize={1.7}>
              Fill your bet
            </P>
            <P style={{ marginTop: 10 }} italic={true} fontSize={1.7}>
              {
                gameData.types.find((item) => item.type === selectedGame?.type)
                  ?.description
              }
            </P>
            <div>
              {[...new Array(selectedGame?.range)].map((item, index) => (
                <NumberButton
                  key={index + 1}
                  value={index + 1}
                  color={selectedGame?.color}
                  selected={selNumbers.includes(index + 1)}
                  onClick={addToArr}
                >
                  {index + 1}
                </NumberButton>
              ))}
            </div>
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
