import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import shoppingcartIcon from '../assets/cart_icon.png';
import { Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const{height:SCREEN_HEIGHT} = Dimensions.get('window');

const RenderItem = ({ data, removeFromCart }) => {
  [currentQuantity, setQuantity] = useState(data.item.quantity)

  const add = () =>{
    if(data.item.quantity > 0){
      setQuantity(data.item.quantity++);
    }
  }
  const subtract = () =>{
    if(data.item.quantity > 0){
      setQuantity(data.item.quantity--);
    }
  }
  return(
    <View style={styles.item}>
      <Text style={styles.title}>{data.item.title}</Text>
      <TouchableOpacity onPress={removeFromCart ? () => removeFromCart(data.item) : () => console.log(error)}>
          <Text>Remove</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={add}>
        <Text> + </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={subtract}>
        <Text> - </Text>
      </TouchableOpacity>
      <Text>Quantity: {currentQuantity}</Text>
      
    </View>
  );
};

const ShoppingCart = ({products, cartState}) =>{

  //Calculate total price
  let total = 0;
  for(let i = 0; i < products.length; i++){
    total += products[i].item.price;
  }
  const removeFromCart = (product) => {
    //get the products array that do not contain the item we want to delete
    cartState(products.filter((productToRemove) => productToRemove.item !== product),
    );
  };

  const translateY = useSharedValue(0);
  //to get the old position
  const context = useSharedValue({y:0});

  //handling the moving
  const gesture = Gesture.Pan().onStart(()=>{
    context.value = {y:translateY.value};
  }).onUpdate((event)=>{
    translateY.value = event.translationY + context.value.y;
      //clamp the view up
    translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT + 50 )
    //clamp the view down
    translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT/20 )
    //When done panning
  }).onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      translateY.value = withTiming(-SCREEN_HEIGHT/20)
    }else if(translateY.value < -SCREEN_HEIGHT/2){
      translateY.value = withTiming(-SCREEN_HEIGHT + 50);
    }

  });

  //start value of the view
  useEffect(()=>{
    translateY.value = withTiming(-SCREEN_HEIGHT/20);
  },[]);
  //animation style
  const rBottomStyle = useAnimatedStyle(()=>{
    return{
      transform:[{translateY:translateY.value}],
    };
  });

  return(
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheet, rBottomStyle]}>
        <View style={styles.line}/>
        <View style={styles.row}>
          <Image source={shoppingcartIcon}/>
          <Text>Total price: {total} </Text>
          <Text>Total items: {products.length}</Text>
        </View>
        <View>
          {products.map((item, index) => (
            <RenderItem 
            key={index}
            data = {item} 
            removeFromCart={removeFromCart}
            />
          ))}
        </View>
        
      </Animated.View>
    </GestureDetector>
  )
};
export default ShoppingCart;

const styles = StyleSheet.create({

  bottomSheet:{
      height:SCREEN_HEIGHT,
      width:'100%',
      backgroundColor: 'grey',
      position:'absolute',
      top:SCREEN_HEIGHT,
      borderRadius:25
  },
  line:{
      width:75,
      height:4,
      backgroundColor:'white',
      alignSelf:'center',
      marginVertical: 15,
      borderRadius:2
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row:{
    flexDirection:'row',
  }
});