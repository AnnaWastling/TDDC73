import React, { useRef, useState } from 'react';
import {FlatList, View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import { getProducts } from '../assets/shopping_data';

const {width, height} = Dimensions.get('screen');
const carousel_data = getProducts();
const SlideItem = ({data}) => {
    return(
        <View style={{width:width, height:height, alignItems:'center'}}>
            <Image source={data.img} resizeMode="contain" style={styles.image}/>
                <View style={styles.content}>            
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <Text style={styles.price}>{data.price}</Text>
            </View>
        </View>
    );
}
const PaginationItem = ({data, idx}) => {
    return(
        <View style={styles.dotsContainer}>
            {data.map((_,index) => {
                    return <View 
                        key={index.toString()} 
                        style={[styles.dots, index === idx && styles.dotActive]}
                        />
                })}
        </View>
    );
}

 const Carousel = () => {
    const [index, setIndex] = useState(0);
    const handleOnViewableItemsChanged = useRef(({viewableItems}) =>{
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50, //how many percentage the slide should be on the frame to be considererd visible
    }).current;
  return(
    <View >
        <FlatList
        data={carousel_data}
        style={{ flex: 2 }}
        renderItem={({ item }) => <SlideItem data={item} />}
        pagingEnabled = {true}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig = {viewabilityConfig}
        keyExtractor={(item) => item.id.toString()}
        />
        <PaginationItem data={carousel_data} idx={index}/>
    </View>
  );
};
export default Carousel;


const styles = StyleSheet.create({
    dots:{
        width: 10,
        height: 10,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginHorizontal: 5,
    },
    dotsContainer:{
        position:'absolute',
        bottom:50,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent: 'center'
    },
    dotActive:{
        backgroundColor:'#000'
    },
    image:{
        width: '100%',
        flex:0.6,
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