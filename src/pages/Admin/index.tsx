import PrivateRoutesLayout from '../../components/PrivateRoutesLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Title, P, SendButton } from '../../styles/ui';
import { GameButton } from '../../styles/games';
import { useState } from 'react';
import { GameInfo } from '../../types/type';
import {
  deleteGame,
  updateGame,
  createNewGame,
  getGameData,
} from '../../services/api';
import { getData } from '../../redux/gameSlice';
import { AlertError, AlertSuccess } from '../../components';

const Admin = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const gameData = useSelector((state) => state.game);
  const [selectedGame, setSelectedGame] = useState<GameInfo | undefined>(
    gameData.types.find((item) => item.type === 'Mega-Sena')
  );

  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [range, setRange] = useState(0);
  const [max_number, setMax_number] = useState(0);
  const [color, setColor] = useState('');

  const [criarGame, setCriarGame] = useState(false);
  const [update, setUpdate] = useState(false);

  if (!selectedGame) {
    navigate('/home');
    return <P>Ops, algo deu errado</P>;
  }

  const formIsValid = () => {
    if (type.trim() === '') {
      AlertError('Digite um nome válido para o game');
      return;
    }
    if (description.trim() === '') {
      AlertError('Digite uma descrição válida para o game.');
      return;
    }
    if (range === 0) {
      AlertError('Dê um range para o game');
      return;
    }
    if (max_number === 0) {
      AlertError('Dê uma quantidade máxima de números para o game');
      return;
    }
    if (!(color.includes('#', 0) && color.length === 7)) {
      AlertError('Digite uma cor válida');
      return;
    }
    if (price === 0) {
      AlertError('Dê um preço para o game');
      return;
    }
  };

  const createGame = async (e: any) => {
    e.preventDefault();

    formIsValid();

    const newGame = {
      type,
      description,
      price,
      range,
      max_number,
      color,
    };
    if (!user.token) {
      return;
    }
    await createNewGame(user.token, newGame)
      .then(() => AlertSuccess('Game criado com sucesso.'))
      .catch((error) => AlertError(error.response.data.message));
    await getGameData()
      .then((response) => dipatch(getData(response)))
      .catch((error) => AlertError(error.response.data.message));

    setType('');
    setDescription('');
    setPrice(0);
    setColor('');
    setMax_number(0);
    setRange(0);

    setCriarGame(false);
    setSelectedGame(gameData.types.find((item) => item.type === 'Mega-Sena'));
  };

  const atualizarGame = async (e: any) => {
    e.preventDefault();
    formIsValid();

    const newGame = {
      type,
      description,
      price,
      range,
      max_number,
      color,
    };
    if (!user.token) {
      return;
    }
    await updateGame(user.token, selectedGame.id, newGame)
      .then((response) => {
        AlertSuccess('Game Atualizado');
      })
      .catch((error) => AlertError(error.response.data.message));
    await getGameData()
      .then((response) => dipatch(getData(response)))
      .catch((error) => AlertError(error.response.data.message));

    setType('');
    setDescription('');
    setPrice(0);
    setColor('');
    setMax_number(0);
    setRange(0);

    setUpdate(false);
    setSelectedGame(gameData.types.find((item) => item.type === 'Mega-Sena'));
  };

  const apagarGame = async (e: any) => {
    e.preventDefault();
    if (!user.token) {
      return;
    }
    await deleteGame(user.token, selectedGame.id)
      .then((response) => {
        AlertSuccess(`Game deletado com sucesso. ${response}`);
      })
      .catch((error) => AlertError(error.response.data.message));
    await getGameData()
      .then((response) => dipatch(getData(response)))
      .catch((error) => AlertError(error.response.data.message));
  };

  return (
    <PrivateRoutesLayout>
      <section className="gamesPage">
        <Title fontSize={2.4}>Jogos existentes</Title>
        <div className="selectGame">
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
          <SendButton
            fontSize={2}
            noPadding={true}
            color="gray"
            onClick={() => setCriarGame(true)}
          >
            Create New Game
          </SendButton>
        </div>
        {criarGame && (
          <div>
            <form onSubmit={createGame}>
              <P italic={true} fontSize={2.4}>
                New Game
              </P>
              <input
                type="text"
                placeholder="Game name"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <input
                type="text"
                placeholder="Game description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Game range"
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max Number"
                value={max_number}
                onChange={(e) => setMax_number(Number(e.target.value))}
              />
              <input
                type="text"
                placeholder="Game color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                type="text"
                placeholder="Game price (Ex.: 4.25)"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div>
                <SendButton fontSize={2} noPadding={true} color="gray">
                  Criar game
                </SendButton>
                <SendButton
                  fontSize={2}
                  noPadding={true}
                  color="gray"
                  onClick={(e) => {
                    e.preventDefault();
                    setCriarGame(false);
                  }}
                >
                  Cancel
                </SendButton>
              </div>
            </form>
          </div>
        )}

        {!criarGame && !update && (
          <div>
            <div>
              <P italic={true} fontSize={2.4}>
                {selectedGame.type}
              </P>
              <P italic={true} bold={true}>
                Description <span>{selectedGame.description}</span>
              </P>
              <P italic={true} bold={true}>
                Range <span>{selectedGame.range}</span>
              </P>
              <P italic={true} bold={true}>
                Quantidade máxima de números selecionados{' '}
                <span>{selectedGame.max_number}</span>
              </P>
              <P italic={true} bold={true}>
                Preço:{' '}
                <span>
                  {selectedGame.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </P>
              <P italic={true} bold={true}>
                Color:{' '}
                <span style={{ color: selectedGame.color }}>
                  {selectedGame.color}
                </span>
              </P>
            </div>
            <div className="actionButtons">
              <SendButton
                fontSize={2}
                noPadding={true}
                color="greenCart"
                onClick={() => {
                  setType(selectedGame.type);
                  setDescription(selectedGame.description);
                  setPrice(selectedGame.price);
                  setRange(selectedGame.range);
                  setMax_number(selectedGame.max_number);
                  setColor(selectedGame.color);
                  setUpdate(true);
                }}
              >
                Atualizar Game
              </SendButton>
              <SendButton
                fontSize={2}
                noPadding={true}
                color="gray"
                onClick={apagarGame}
              >
                Deletar Game
              </SendButton>
            </div>
          </div>
        )}

        {update && (
          <div>
            <form onSubmit={atualizarGame}>
              <P italic={true} fontSize={2.4}>
                Update Game
              </P>
              <input
                type="text"
                placeholder="Game name"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <input
                type="text"
                placeholder="Game description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Game range"
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max Number"
                value={max_number}
                onChange={(e) => setMax_number(Number(e.target.value))}
              />
              <input
                type="text"
                placeholder="Game color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                type="text"
                placeholder="Game price (Ex.: 4.25)"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div>
                <SendButton
                  fontSize={2}
                  noPadding={true}
                  color="gray"
                  onClick={atualizarGame}
                >
                  Atualizar game
                </SendButton>
                <SendButton
                  fontSize={2}
                  noPadding={true}
                  color="gray"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdate(false);
                  }}
                >
                  Cancel
                </SendButton>
              </div>
            </form>
          </div>
        )}
      </section>
    </PrivateRoutesLayout>
  );
};

export default Admin;
