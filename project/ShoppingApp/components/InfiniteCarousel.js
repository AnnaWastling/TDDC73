import React, {useState, useContext} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {CartContext} from './CartContext';
import arrowL from '../assets/arrowleft.png';
import arrowR from '../assets/arrowright.png';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const Card = ({data}) => {
  const {addItemToCart} = useContext(CartContext);

  function onAddToCart() {
    addItemToCart(data.id);
  }

  return (
    <View style={styles.card}>
      <Image source={data.img} resizeMode="contain" style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.price}>${data.price}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onAddToCart()}>
          <Text style={styles.buttontext}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfiniteCarousel = ({products, numberItems}) => {
  const [pageIndex, setPageIndex] = useState(0);

  let dots = [];
  let pages = products.length / numberItems; // for the dots
  //if pageIndex is last page, set pageIndex = 0 otherwise add pageIndex
  const nextPage = () => {
    setPageIndex(pageIndex === pages - 1 ? 0 : pageIndex + 1);
  };
  //if pageIndex is first page, set pageIndex = last otherwise subtract from pageIndex
  const prevPage = () => {
    setPageIndex(pageIndex === 0 ? pages - 1 : pageIndex - 1);
  };
  //connect dots with nr pages, different color for current page-dot
  for (let i = 0; i < pages; i++) {
    pageIndex === i
      ? dots.push(<View key={i} style={styles.dots} />)
      : dots.push(
          <View key={i} style={[styles.dots, {backgroundColor: '#000'}]} />,
        );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.row}>
        <View>
          <TouchableOpacity onPress={prevPage} >
            <Image source={arrowL} style={styles.arrows}/>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {products.slice(pageIndex * numberItems, pageIndex * numberItems + numberItems).map((card, index) => ( 
            //returns a part of the array, slice(start, end)
          <Card key={index} data={card} />
          ))}
      </View>
        <View>
          <TouchableOpacity onPress={nextPage}>
            <Image source={arrowR} style={styles.arrows}/>
          </TouchableOpacity>
        </View>   
      </View>
      <View style={styles.dotsContainer}>{dots}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 50,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    height: SCREEN_HEIGHT - 300,
    width: 95,
    borderRadius: 50,
    margin:5,
    marginBottom:100
  },
  cardsContainer:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dots: {
    width: 10,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    margin: 10,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    flex: 0.5,
    height: 60,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  arrows:{
    height: 40,
    width: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'grey',
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default InfiniteCarousel;
