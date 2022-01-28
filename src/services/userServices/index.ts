import { api } from '../../shared/helpers';

import { AlertError } from '../../components';

const userServices = () => {
  async function createUser(data: {
    email: string;
    password: string;
    name: string;
  }) {
    return api
      .post('/user/create', data)
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        AlertError(error.response.data.error.message);
      });
  }

  async function updateMyUser(
    data: { email: string; name: string },
    token: string
  ) {
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
      .then((response) => response.data)
      .catch((error) => AlertError(error.response.data.message));
  }

  async function myAccount(token: string) {
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
      .catch((error) => AlertError(error.response.data.message));
  }

  return { createUser, updateMyUser, myAccount };
};

export default userServices;
