import {
  useState,
  useReducer,
  useEffect
} from "react";

import queryString from 'query-string';

import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "DEFAULT":
      return {
        ...state
      };
    case "UPDATE":
      return {
        ...state, ...action.payload
      };
    default:
      throw new Error();
  }
};


const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, initialData);

  const listProducts = (items, sort, size) => {

    if (sort !== '') {
      items.sort((a, b) =>
        (sort === 'lowestprice' ?
          ((a.price > b.price) ? 1 : -1) :
          ((a.price < b.price) ? 1 : -1)));
    } else {
      items.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }
    if (size !== '') {
      return items.filter(a => a.availableSizes.indexOf(size.toUpperCase()) >= 0);
    }
    return items;
  }



  useEffect(() => {

    const fetchData = async () => {
      const {
        query
      } = queryString.parseUrl(url);
      console.log("QUERY:", query);

      const sortValue = query.sort;
      const sizeValue = query.size;

      try {
        const result = await axios(url, {
          headers: {
            contentType: 'application/json'
          }
        });

        dispatch({
          type: "UPDATE",
          payload: {
            products: result.data,
            filteredProducts: listProducts(result.data, sortValue, sizeValue)
          }
        });


      } catch (error) {
        console.error("Error:", error);
        dispatch({
          type: 'DEFAULT'
        });
      }
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
};

export {
  useDataApi
};