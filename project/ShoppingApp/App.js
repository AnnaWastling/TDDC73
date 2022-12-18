import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from './components/Carousel.js'
import ShoppingCart from './components/ShoppingCart.js';
import PRODUCTS from './assets/shopping_data';
import InfiniteCarousel from './components/InfiniteCarousel.js';

export default function App(){
    const [productsInCart, addProduct] = useState([]);
    
    const addToCart = (item) => {
        addProduct([
            ...productsInCart,
            {item}
        ]);
        //console.log(productsInCart)
    };
    //need carousel to go around infinity
    //need to be able to remove items from shoppingcart

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <View style={styles.container}>
                <InfiniteCarousel  products={PRODUCTS} onPress = {addToCart} numberItems={1}/>
                {/* <Carousel products={PRODUCTS} onPress = {addToCart} numberItems={3}/> */}
                <ShoppingCart products={productsInCart} />
            </View>
            
        </GestureHandlerRootView>
    );
  };

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        bottom:50,
        flexDirection:'column',
        width:'100%',
        alignItems:'center',
        justifyContent: 'space-evenly'
    },
});