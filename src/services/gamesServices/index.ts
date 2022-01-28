import { api } from '../../shared/helpers';
import { GameInfo } from '../../types/type';
import { AlertError } from '../../components';

const gamesServices = () => {
  async function createGame(
    token: string,
    data: {
      type: string;
      description: string;
      range: number;
      price: number;
      max_number: number;
      color: string;
    }
  ) {
    return api
      .request({
        method: 'POST',
        url: '/admin/create-game',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      })
      .then((response) => response.data)
      .catch((error) => AlertError(error.response.data.message));
  }

  async function updateGame(
    token: string,
    gameId: number,
    data: {
      type: string;
      description: string;
      range: number;
      price: number;
      max_number: number;
      color: string;
    }
  ) {
    return api
      .request({
        method: 'PUT',
        url: `/admin/update-game/${gameId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      })
      .then((response) => response.data)
      .catch((error) => AlertError(error.response.data.message));
  }

  async function listGames() {
    return api
      .get<{ min_cart_value: number; types: GameInfo[] }>('/cart_games')
      .then((response) => response.data);
  }

  async function deleteGame(token: string, gameId: number) {
    return api
      .delete(`/admin/delete-game/${gameId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => AlertError(error.response.data.message));
  }
  return { createGame, updateGame, deleteGame, listGames };
};

export default gamesServices;
