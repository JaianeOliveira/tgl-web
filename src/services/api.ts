import { GameInfo } from "../types/type";
import axios from "axios";
export const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

export const postRequests = (
  path: string,
  data: object,
  state?: any,
  navigator?: any
) => {
  const options: object = {
    method: "POST",
    url: `http://127.0.0.1:3333${path}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      state({
        email: response.data.user.email,
        user: response.data.user.name,
        token: response.data.token.token,
      });
      localStorage.setItem("token", response.data.token.token);
    })
    .then(() => navigator("/home"))
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

export const getRequests = (path: string, state?: any) => {
  const options: object = {
    method: "GET",
    url: `http://127.0.0.1:3333${path}`,
    headers: { Accept: "application/json" },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("Response Data", response.data);
      state(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getGameData = async (): Promise<{
  min_cart_value: number;
  types: GameInfo[];
}> => {
  return api
    .get<{ min_cart_value: number; types: GameInfo[] }>("/cart_games")
    .then(({ data }) => {
      return data;
    });
};

export const loginFetch = async (data: { email: string; password: string }) => {
  return api
    .post("/login", data)
    .then(({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.token.token);
      return data;
    })
    .catch((error) => {
      console.log(error.response);
      alert(error.response.data.message);
    });
};

export const newUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return api
    .post("/user/create", data)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      alert(error.response.data.error.message);
    });
};
