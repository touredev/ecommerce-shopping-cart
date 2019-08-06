import React from "react";
import utils from "../services/utils";

const Basket = ({ cartItems, handleARemoveFromCart }) => {
  return (
    <div className="alert alert-info">
      {cartItems.length === 0 ? (
        "Basket is empty"
      ) : (
        <div>
          You have {cartItems.length} items in the basket. <hr />
        </div>
      )}
      {cartItems.length > 0 && (
        <div>
          <ul style={{ marginLeft: -25 }}>
            {cartItems.map(item => (
              <li key={item.id}>
                <b>{item.title}</b>
                <button
                  style={{ float: "right" }}
                  className="btn btn-danger btn-xs"
                  onClick={e => handleARemoveFromCart(e, item)}
                >
                  X
                </button>
                <br />
                {item.count} X {utils.formatCurrency(item.price)}
              </li>
            ))}
          </ul>
          <b>
            Sum:
            {utils.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </b>
          <button
            onClick={() => alert("Todo: Implement checkout page.")}
            className="btn btn-primary"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Basket;
