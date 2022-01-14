import axios from "axios";

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
