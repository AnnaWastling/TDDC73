import React from 'react';
import {View, StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from './components/Carousel.js'
import ShoppingCart from './components/ShoppingCart.js';


export default function App(){
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <View style={styles.container}>
                <Carousel/>
                <ShoppingCart/>
            </View>
        </GestureHandlerRootView>
    );
  };

  const styles = StyleSheet.create({
    container:{
        flex: 2,
        bottom:50,
        flexDirection:'column',
        width:'100%',
        alignItems:'center',
        justifyContent: 'space-evenly'
    },
});