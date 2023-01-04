import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import shoppingcartIcon from '../assets/cart_icon.png';
import { Gesture, GestureDetector, FlatList } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CartContext } from './CartContext';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ShoppingCart = ({ backgroundColor, borderRadius }) => {
  const {
    items,
    getItemsCount,
    getTotalPrice,
    removeFromCart,
    addQuantity,
    subtractQuantity,
  } = useContext(CartContext);

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
  }

  const CartItem = ({ data }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{data.product.title}</Text>
        <Image source={data.product.img} style={styles.cartImage} />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallbuttons}
            onPress={() => addQuantity(data)}>
            <Text style={{ fontSize: 20 }}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallbuttons}
            onPress={() => subtractQuantity(data)}>
            <Text style={{ fontSize: 20 }}> - </Text>
          </TouchableOpacity>
        </View>
        <Text>Quantity: {data.quantity}</Text>
        <Text>Price: {data.quantity * data.product.price}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => removeFromCart(data.product)}>
          <Text style={styles.buttontext}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //useSharedValue = hook to create a reference to a value that can be shared and altered
  const translateY = useSharedValue(0);
  //to get the old position
  const context = useSharedValue({ y: 0 });

  //start value of the view
  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 8);
  }, []);

  //animation style
  const bottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  //handling the moving
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      //clamp the view up
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT);
      //clamp the view down
      translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT / 8);
      //When done panning
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        translateY.value = withTiming(-SCREEN_HEIGHT / 8);
      } else if (translateY.value < -SCREEN_HEIGHT / 2) {
        translateY.value = withTiming(-SCREEN_HEIGHT);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.bottomSheet,
          bottomStyle,
          { backgroundColor: backgroundColor },
          { borderRadius: borderRadius },
        ]}>
        <View style={styles.line} />
        <View
          style={[
            styles.row,
            { alignItems: 'center' },
            { justifyContent: 'center' },
          ]}>
          <Image source={shoppingcartIcon} />
          <Totals />
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => <CartItem data={item} />}></FlatList>
        <View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={null}>
          <Text style={styles.buttontext}>Checkout</Text>
        </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  item: {
    padding: 50,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#fcfcfc',
  },
  row: {
    flexDirection: 'row',
  },
  cartImage: {
    height: 100,
    width: '50%',
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    width: '50%',
    backgroundColor: '#69150f',
  },
  smallbuttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 10,
    elevation: 3,
    width: '10%',
    backgroundColor: '#ededed',
  },
  checkoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
    width: '90%',
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 8,
  },
  buttontext: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ShoppingCart;
