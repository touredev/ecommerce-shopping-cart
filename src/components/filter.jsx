import React from "react";

const Filter = ({ count, size, sort, handleSizeChange, handleSortChange }) => {
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
            onChange={handleSortChange}
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
            onChange={handleSizeChange}
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

export default Filter;
