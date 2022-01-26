import { GameInfo } from '../types/type';
import axios from 'axios';

import { alertError } from '../components/Alerts/Alerts';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
});

export const getGameData = async (): Promise<{
  min_cart_value: number;
  types: GameInfo[];
}> => {
  return api
    .get<{ min_cart_value: number; types: GameInfo[] }>('/cart_games')
    .then(({ data }) => {
      return data;
    });
};

export const loginFetch = async (data: { email: string; password: string }) => {
  return api
    .post('/login', data)
    .then(({ data }) => {
      localStorage.setItem('token', data.token.token);
      return data;
    })
    .catch((error) => {
      alertError(error.response.data.message);
    });
};

export const newUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return api
    .post('/user/create', data)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      alertError(error.response.data.error.message);
    });
};

export const getRecentGames = async (token: string) => {
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
      alertError(error.response.message);
    });
};

export const newBet = async (
  data: { game_id: number; numbers: number[] }[],
  userToken: string
) => {
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
      alertError(error.response.data.message);
    });
};

export const myAccount = async (token: string) => {
  return api
    .request({
      method: 'GET',
      url: '/user/my-account',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => alertError(error.response.data.message));
};

export const setUser = async (
  data: { email: string; name: string },
  token: string
) => {
  return api
    .request({
      method: 'PUT',
      url: '/user/update',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    })
    .then((response) => response.data);
};

export const sendLink = async (email: string) => {
  return api.post('/reset', { email: email }).then((response) => response.data);
};

export const resetPassword = async (token: string, password: string) => {
  return api
    .post(`/reset/${token}`, { password: password })
    .then((response) => response.data);
};

export const deleteGame = async (token: string, gameId: number) => {
  return api
    .delete(`/admin/delete-game/${gameId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => alertError(error.response.data.message));
};

export const updateGame = async (
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
) => {
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
    .catch((error) => alertError(error.respone.data.message));
};

export const createNewGame = async (
  token: string,
  data: {
    type: string;
    description: string;
    range: number;
    price: number;
    max_number: number;
    color: string;
  }
) => {
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
    .catch((error) => alertError(error.response.data.message));
};
