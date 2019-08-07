import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS
} from "../actions/types";

const initialState = {
  items: [],
  filteredItems: [],
  size: '',
  sort: ''
};


export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state, items: action.payload, filteredItems: action.payload
      };
    case FILTER_PRODUCTS:
      return {
        ...state, sort: action.payload.sort, size: action.payload.size, filteredItems: action.payload.items
      };
    default:
      return state;
  }

}