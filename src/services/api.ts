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
      console.log(response.data.token.token);
      console.log(response.data.user.email);
      console.log(response.data.user.name);
      state(response.data);
    })
    .then(() => navigator("/home"))
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
