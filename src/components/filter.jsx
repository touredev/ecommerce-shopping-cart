import React from "react";
import { connect } from "react-redux";
import { filterProducts } from "../actions/productActions";

const Filter = ({ count, size, sort, products, filterProducts }) => {
  return (
    <div className="row">
      <div className="col-md-4">{count} producs found.</div>
      <div className="col-md-4">
        <label htmlFor="">
          Order by
          <select
            name=""
            id=""
            className="form-control"
            value={sort}
            onChange={e => filterProducts(products, e.target.value, size)}
          >
            <option value="">Select</option>
            <option value="lowestprice">Lowest to highest</option>
            <option value="highestprice">Highest to lowest</option>
          </select>
        </label>
      </div>
      <div className="col-md-4">
        <label>
          Filter Size
          <select
            className="form-control"
            value={size}
            onChange={e => filterProducts(products, sort, e.target.value)}
          >
            <option value="">ALL</option>
            <option value="x">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    products: state.products.items,
    sort: state.products.sort,
    size: state.products.size,
    count: state.products.filteredItems.length
  }),
  { filterProducts }
)(Filter);
