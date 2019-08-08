import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE
} from "./types";

import utils from '../services/utils';

export const fetchProducts = () => (dispatch) => {

  fetch(utils.baseUrl()).then(res => res.json())
    .catch(err => fetch('db.json').then(res => res.json()).then(data => data.products))
    .then(products => {
      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
    });

}

export const filterProducts = (products, size) => (dispatch) => {

  return dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items: size === '' ? products : products.filter(a => a.availableSizes.indexOf(size.toUpperCase()) >= 0)
    }
  });
}


export const sortProducts = (items, sort) => (dispatch) => {
  const products = items.slice();
  if (sort !== '') {
    products.sort((a, b) =>
      (sort === 'lowestprice' ?
        ((a.price > b.price) ? 1 : -1) :
        ((a.price < b.price) ? 1 : -1)));
  } else {
    products.sort((a, b) => (a.id > b.id) ? 1 : -1);
  }

  return dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: products
    }
  });
}