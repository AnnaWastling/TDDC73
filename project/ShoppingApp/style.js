import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
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
    }
});