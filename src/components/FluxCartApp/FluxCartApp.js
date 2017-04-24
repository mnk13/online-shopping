import React from 'react';
import CartStore from '../../stores/CartStore';
import ProductStore from '../../stores/ProductStore';
import GridStore from '../../stores/GridStore';
import FluxProduct from '../FluxProduct';
import FluxCart from '../FluxCart';
import FluxGrid from '../FluxGrid';
import './FluxCartApp.css'

function getCartState() {
  return {
    products: GridStore.getProducts(),
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    selectedGrid: GridStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    nuvalTotal: CartStore.getNuvalTotal(),
  };
}

export default class FluxCartApp extends React.Component {
  constructor(props) {
    super();
    this.state = getCartState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ProductStore.addChangeListener(this._onChange);
    GridStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
    GridStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getCartState());
  }

  render() {
    const {cartItems, cartCount, cartTotal, product, selectedProduct, products, selectedGrid, nuvalTotal} = this.state;
    return (
      <div className="flux-cart-app">
        <FluxCart
          products={cartItems}
          count={cartCount}
          total={cartTotal}
          nuvalTotal={nuvalTotal}/>
        <FluxGrid
          products={products}
          cartItems={cartItems}
          category={this.props.category}/>
      </div>
    );
  }

}
