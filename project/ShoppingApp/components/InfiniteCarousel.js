import React, { useState } from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({data, onPress}) => {
    return(
        <View style={styles.card}>
            <Image source={data.img} resizeMode="contain" style={styles.image}/>
                <View style={styles.content}>            
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <Text style={styles.price}>{data.price}</Text>
                <TouchableOpacity onPress={onPress ? () => onPress(data) : () => console.log(error)}>
                    <Text>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const InfiniteCarousel = ({products, onPress, numberItems }) => {
    const [index, setIndex] = useState(0);
    let dots = [];
    let nrItems = numberItems ? numberItems : 1;
    let pages = products.length / nrItems; // for the dots
    //if index is last page, set index = 0 otherwise add index
    const nextPage = () => {
        setIndex(index === products.length - 1 ? 0 : index + 1); 
      };
      //if index is first page, set index = last otherwise subtract from index
      const prevPage = () => {
        setIndex(index === 0 ? products.length - 1 : index - 1);
      };

    for (let i = 0; i < pages; i++) {
        index === i
        ? dots.push(
            <View key={i} style={styles.dots} />,
          )
        : dots.push(
            <View key={i} style={[styles.dots, {backgroundColor:'#000'}]} />,
          );
    }
  
    return (
      <View style={styles.container}>
            {products
              .slice(
                index * nrItems,
                index * nrItems + nrItems,
              )
              .map((card) => (
                <Card
                  key={index}
                  data={card}
                  onPress={onPress}
                />
            ))}
            <View>
              <TouchableOpacity
              onPress={nextPage}>
                <Text>right</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={prevPage}>
                <Text>left</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.dotsContainer}>{dots}</View>
      </View>
      
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
    dotsContainer:{
        position:'absolute',
        bottom:150,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent: 'center'
    },
    card:{
        borderWidth: 1,
        overflow: 'hidden',
        height: '50%',
        width:'100%'
    },
    dots:{
        width: 10,
        height: 10,
        backgroundColor: 'grey',
        borderRadius: 50,
        margin: 10,
    },
    image:{
        height: '50%',
        width: '100%',
        flex:0.5,
    },
    content:{
        flex:0.4,
        alignItems: 'center',
    },
    title:{
        fontSize: 24,
        fontWeight:'bold'
    },
    description:{
        fontSize: 20,
    },
    price:{
        fontSize: 32,
        fontWeight:'bold'
    },
  });

export default InfiniteCarousel;
