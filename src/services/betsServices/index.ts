import { api } from '../../shared/helpers';
import { AlertError } from '../../components';

const betsServices = () => {
  async function listBet(token: string) {
    return api
      .request({
        method: 'GET',
        url: '/bet/all-bets',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        AlertError(error.response.data.message);
      });
  }

  async function newBet(
    data: { game_id: number; numbers: number[] }[],
    userToken: string
  ) {
    return api
      .request({
        method: 'POST',
        url: '/bet/new-bet',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          games: data,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        AlertError(error.response.data.message);
      });
  }
  return { listBet, newBet };
};

export default betsServices;
