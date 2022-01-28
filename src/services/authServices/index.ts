import { api } from '../../shared/helpers';

import { AlertError } from '../../components';

const authServices = () => {
  async function loginUser(data: { email: string; password: string }) {
    return api
      .post('/login', data)
      .then(({ data }) => {
        localStorage.setItem('token', data.token.token);
        return data;
      })
      .catch((error) => {
        AlertError(error.response.data.message);
      });
  }

  async function resetPassword(email: string) {
    return api
      .post('/reset', { email: email })
      .then((response) => response.data);
  }

  async function changePassword(token: string, password: string) {
    return api
      .post(`/reset/${token}`, { password: password })
      .then((response) => response.data);
  }

  return { loginUser, resetPassword, changePassword };
};

export default authServices;
