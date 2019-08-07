import React, { useEffect } from "react";
import utils from "../services/utils";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

const mapStateToProps = state => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items
});

const Products = ({ products, cartItems, fetchProducts, addToCart }) => {
  useEffect(() => fetchProducts(), []);

  const productItems = products.map(product => (
    <div className="col-md-4" key={product.id}>
      <div className="thumbnail text-center">
        <a
          href={`#${product.id}`}
          onClick={() => addToCart(cartItems, product)}
        >
          <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />

          <p>{product.title}</p>
        </a>
        <div>
          <b>{utils.formatCurrency(product.price)}</b>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(cartItems, product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  ));

  return <div className="row">{productItems}</div>;
};

export default connect(
  mapStateToProps,
  { fetchProducts, addToCart }
)(Products);
