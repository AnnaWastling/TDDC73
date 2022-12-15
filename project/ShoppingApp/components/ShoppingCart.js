import React, {useEffect} from 'react';
import {View, Dimensions, Image, Text, StyleSheet} from 'react-native';
import { getProducts } from '../assets/shopping_data';
import shoppingcartIcon from '../assets/cart_icon.png';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

const{height:SCREEN_HEIGHT} = Dimensions.get('window');

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ShoppingCart = () =>{

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  const translateY = useSharedValue(0);
  const carousel_data = getProducts();
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
  }).onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      translateY.value = withTiming(-SCREEN_HEIGHT/20)
    }else if(translateY.value < -SCREEN_HEIGHT/2){
      translateY.value = withTiming(-SCREEN_HEIGHT + 50);
    }

  });

  //startvalue of the view
  useEffect(()=>{
    translateY.value = withTiming(-SCREEN_HEIGHT/20);
  },[]);

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
          <Text>Price: </Text>
        </View>
        <FlatList
        data={carousel_data}
        renderItem={renderItem}>
        </FlatList>
      </Animated.View>
    </GestureDetector>
  )
};
export default ShoppingCart;

const styles = StyleSheet.create({
  container:{
      flex: 2,
      bottom:50,
      flexDirection:'column',
      width:'100%',
      alignItems:'center',
      justifyContent: 'space-evenly'
  },
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
});