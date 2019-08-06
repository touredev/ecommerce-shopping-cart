import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDataApi } from "./hooks/dataFetchingHooks";
import Products from "./components/products";
import Filter from "./components/filter";
import Basket from "./components/basket";

const initialState = {
  products: [],
  filteredProducts: []
};

const initCart = () => {
  if (localStorage.getItem("cartItems")) {
    return JSON.parse(localStorage.getItem("cartItems"));
  } else {
    return [];
  }
};

function App() {
  const getFilterUrl = () =>
    `http://localhost:8000/products?sort=${sort}&size=${size}`;

  const [sort, setSort] = useState("");
  const [size, setSize] = useState("");
  const [cartItems, setCartItems] = useState(initCart());
  const [{ filteredProducts }, doFetch] = useDataApi(
    getFilterUrl(),
    initialState
  );

  const handleAddToCart = (e, product) => {
    const basket = [...cartItems];
    let productAlreadyInCart = false;

    basket.forEach(cp => {
      if (cp.id === product.id) {
        cp.count += 1;
        productAlreadyInCart = true;
      }
    });
    if (!productAlreadyInCart) {
      basket.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(basket));
    setCartItems(basket);
  };

  const handleARemoveFromCart = (e, product) => {
    const basket = cartItems.filter(a => a.id !== product.id);
    localStorage.setItem("cartItems", JSON.stringify(basket));
    setCartItems(basket);
  };

  const handleSizeChange = e => {
    setSize(e.target.value);
  };

  const handleSortChange = e => {
    setSort(e.target.value);
  };

  useEffect(() => {
    doFetch(getFilterUrl());
  }, [sort, size]);

  return (
    <div className="container">
      <h1>E-commerce Shopping Cart Application</h1>
      <hr />
      <div className="row">
        <div className="col-md-9">
          <Filter
            size={size}
            sort={sort}
            handleSizeChange={handleSizeChange}
            handleSortChange={handleSortChange}
            count={filteredProducts.length}
          />
          <hr />
          <Products
            products={filteredProducts}
            handleAddToCart={handleAddToCart}
          />
        </div>
        <div className="col-md-3">
          <Basket
            cartItems={cartItems}
            handleARemoveFromCart={handleARemoveFromCart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
