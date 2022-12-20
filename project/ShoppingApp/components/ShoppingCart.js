import React, {useEffect, useState, useContext} from 'react';
import {View, Dimensions, Image, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import shoppingcartIcon from '../assets/cart_icon.png';
import { Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { CartContext } from './CartContext';
const{height:SCREEN_HEIGHT} = Dimensions.get('window');

const ShoppingCart = ({backgroundColor, borderRadius}) =>{
  const {items, getItemsCount, getTotalPrice, removeFromCart, addQuantity, subtractQuantity} = useContext(CartContext);

  function Totals() {
    let [totalPrice, setTotalPrice] = useState(0);
    let [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
      setTotalPrice(getTotalPrice());
      setTotalItems(getItemsCount());
    });
    return (
      <View style={styles.row}>
         <Text>Total </Text>
         <Text> ${totalPrice} </Text>
         <Text> Quantity {totalItems} </Text>
      </View>
   );
  };

  const CartItem = ({ data }) => {
    return(
      <View style={styles.item}>
        <Text style={styles.title}>{data.product.title}</Text>
        <Image source={data.product.img} style={styles.cartImage}/>
        <TouchableOpacity onPress={() => removeFromCart(data.product)}>
            <Text>Remove</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => addQuantity(data)}>
            <Text> + </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => subtractQuantity(data)}>
            <Text> - </Text>
          </TouchableOpacity>
        </View>
        <Text>Quantity: {data.quantity}</Text>
        <Text>Price: {data.quantity * data.product.price}</Text>
        
      </View>
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
    translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT)
    //clamp the view down
    translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT/8)
    //When done panning
  }).onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      translateY.value = withTiming(-SCREEN_HEIGHT/8)
    }else if(translateY.value < -SCREEN_HEIGHT/2){
      translateY.value = withTiming(-SCREEN_HEIGHT);
    }

  });

  //start value of the view
  useEffect(()=>{
    translateY.value = withTiming(-SCREEN_HEIGHT/8);
  },[]);
  //animation style
  const rBottomStyle = useAnimatedStyle(()=>{
    return{
      transform:[{translateY:translateY.value}],
    };
  });

  return(
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheet, rBottomStyle, {backgroundColor:backgroundColor}, {borderRadius:borderRadius}]}>
        <View style={styles.line}/>
        <View style={[styles.row, {alignItems:'center'}, {justifyContent: "center"}]}>
          <Image source={shoppingcartIcon}/>
          <Totals/>
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => <CartItem data = {item}/>}>
        </FlatList>
      </Animated.View>
    </GestureDetector>
  )
};


const styles = StyleSheet.create({

  bottomSheet:{
      height:SCREEN_HEIGHT,
      width:'100%',
      //backgroundColor: '#f0f0f0',
      position:'absolute',
      top:SCREEN_HEIGHT,
  },
  line:{
      width:75,
      height:4,
      backgroundColor:'grey',
      alignSelf:'center',
      marginVertical: 15,
      borderRadius:2
  },
  item: {
    padding: 50,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius:25,
    backgroundColor:'#fcfcfc'
  },
  row:{
    flexDirection:'row',
  },
  cartImage:{
    height: 100,
    width:'50%',
    borderRadius:5,
  }
});
export default ShoppingCart;