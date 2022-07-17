import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./Store";
import { Provider } from "react-redux";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")
);
