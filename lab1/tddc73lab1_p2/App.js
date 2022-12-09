import React from "react";
import { StyleSheet, Text, View, Image, Button , TouchableOpacity,TextInput } from "react-native";
const App = () => {
  return (
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>
      <View style={{  backgroundColor:"#27756a"}}>
        <Text style={[styles.Header]}>Example 1</Text>
      </View>
      <View style={[styles.ImageContainer]}>
       <Image source={require('C:/Users/Anna/AndroidStudioProjects/tddc73lab1_p2/img.png')}/>
      </View>
      <View style={{ flex: 1}} >
        <View style={[styles.ButtonContainer]} >
          <TouchableOpacity style={[styles.Button]}>
              <Text style={[styles.ButtonText]}>BUTTON</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button]}>
                <Text style={[styles.ButtonText]}>BUTTON</Text>
              </TouchableOpacity>
        </View>
        <View style={[styles.ButtonContainer]} >
          <TouchableOpacity style={[styles.Button]}>
            <Text style={[styles.ButtonText]}>BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button]}>
            <Text style={[styles.ButtonText]}>BUTTON</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1}} >
        <View style={{ flex: 2, flexDirection: "row", alignItems: "flex-start" ,justifyContent: "space-evenly", paddingTop:"5%"}} >
          <Text>Email</Text>
          <TextInput style={{width: "60%"}} underlineColorAndroid="#cf2166" editable/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ButtonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"stretch"
  },
  ImageContainer:{
   flex: 1,
   justifyContent: "center",
   alignItems: 'center',
   paddingTop:"5%",
   paddingBottom:"10%"
  },
  Button:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width:"22%",
    minHeight: "40%",
    maxHeight :10,
    justifyContent: "center"
  },
  ButtonText:{
    color:"black"
  },
  Header:{
    color:"white",
    fontWeight: 'bold',
    padding:"5%",
    fontSize: 20
  }
});

export default App;