import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS
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

export const filterProducts = (products, sort, size) => (dispatch) => {

  const itemsList = [...products];
  if (sort !== '') {
    itemsList.sort((a, b) =>
      (sort === 'lowestprice' ?
        ((a.price > b.price) ? 1 : -1) :
        ((a.price < b.price) ? 1 : -1)));
  } else {
    itemsList.sort((a, b) => (a.id > b.id) ? 1 : -1);
  }

  return dispatch({
    type: FILTER_PRODUCTS,
    payload: {
      sort: sort,
      size: size,
      items: size === '' ? itemsList : itemsList.filter(a => a.availableSizes.indexOf(size.toUpperCase()) >= 0)
    }
  });
}