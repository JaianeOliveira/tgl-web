import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./styles/global";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <GlobalStyle />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
