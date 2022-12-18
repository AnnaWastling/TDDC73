import React, { useState } from 'react';
import {FlatList, View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');
let newWidth;
let newHeight;
const Card = ({data, onPress, width, height}) => {
    console.log(data)
    return(
        <View style={[styles.card, {width:width}, {height:height}]}>
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

 const Carousel = ({products, onPress, numberItems}) => {
    const visableItems = numberItems ? numberItems : 1;
    newWidth = width/visableItems;
    newHeight = newWidth + 50;
    console.log(newWidth);
    return(
        <View >
            <FlatList
            data={products}
            style={{ flex: 1 }}
            renderItem={({ item }) => <Card data = {item} onPress = {onPress} width = {newWidth} height = {newHeight}/>}
            pagingEnabled = {true}
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment='start'
            keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Carousel;


const styles = StyleSheet.create({
    image:{
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
    card:{
        borderWidth: 1,
        overflow: 'hidden',
    }
});