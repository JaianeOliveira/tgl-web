import axios from "axios";

export const postRequests = (path: string, data: object, state?: any) => {
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
      state(response.data);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
