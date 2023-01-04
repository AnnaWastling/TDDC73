import React, { createContext, useState } from 'react';
import PRODUCTS from '../assets/shopping_data';
export const CartContext = createContext();

/*defines a React Context for the shopping cart 
by exposing the shopping cart’s actions*/
export function CartProvider(props) {
  const [items, setItems] = useState([]);

  function addItemToCart(id) {
    const product = PRODUCTS.find(product => product.id == id);

    setItems(prevItems => {
      const item = prevItems.find(item => item.id == id);
      if (!item) {
        //if item not already exist in shoppingcart add it
        return [
          ...prevItems,
          {
            id,
            product,
            totalPrice: product.price,
            quantity: 1,
          },
        ];
      } else {
        //add quantity and price to already existing item in shoppingcart
        return prevItems.map(item => {
          if (item.id == id) {
            item.quantity++;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });
  }
  //total items in cart
  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  //total price for all products
  function getTotalPrice() {
    return items.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0,
    );
  }

  //new cart that dont contain the item to remove
  function removeFromCart(itemToRemove) {
    setItems(items.filter(itemToKeep => itemToKeep.product !== itemToRemove));
  }

  function addQuantity(item) {
    console.log(item.quantity);
    return item.quantity++;
  }
  function subtractQuantity(item) {
    if (item.quantity > 0) {
      console.log(item.quantity);
      return item.quantity--;
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        getItemsCount,
        addItemToCart,
        getTotalPrice,
        removeFromCart,
        addQuantity,
        subtractQuantity,
      }}>
      {props.children}
    </CartContext.Provider>
  );
}
