import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Products from "./components/products";
import Filter from "./components/filter";
import Basket from "./components/basket";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>E-commerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <Filter />
            <hr />
            <Products />
          </div>
          <div className="col-md-3">
            <Basket />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
