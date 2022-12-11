import React from 'react';
import {FlatList, StatusBar, Text, View, ImageBackground} from 'react-native';
import styles from './style.js'


const carouselItems = require('./assets/carousel_data.json');

export default function App(){
  return(
    <View style={styles.container}>
        <StatusBar/>
        <FlatList 
            data={carouselItems}
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            renderItem = {({item, index}) => {
                return(
                    <ImageBackground
                        source={{uri: item.url}}
                    >

                    </ImageBackground>
                )
            }}
            keyExtractor={(item) => item.title.toString()}
        />
    </View>
  );
}






// export default function App(){
//   return(
//     <View style={styles.container}>
//       <Text>  hejhej </Text>
//       <StatusBar/>
//     </View>
//   );
// }
