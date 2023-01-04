import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ShoppingCart from './components/ShoppingCart.js';
import PRODUCTS from './assets/shopping_data';
import InfiniteCarousel from './components/InfiniteCarousel.js';
import { CartProvider } from './components/CartContext.js';

export default function App() {
  return (
    <CartProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <InfiniteCarousel
            products={PRODUCTS}
            numberItems={3}
            cardWidth={100}
          />
          <ShoppingCart backgroundColor={'#f0f0f0'} borderRadius={25} />
        </View>
      </GestureHandlerRootView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
