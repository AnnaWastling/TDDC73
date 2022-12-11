import React from 'react';
import { StatusBar, View} from 'react-native';
import Carousel from './components/Carousel.js';
import ShoppingCart from './components/ShoppingCart.js';
import styles from './style.js'

export default function App(){
  return(
    <View style={styles.container}>
      <Carousel/>
    </View>
  );
}
