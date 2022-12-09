import React, { useState } from 'react';
import { View, StyleSheet,  Button } from 'react-native';
import Card from './CardModel';
import CardForm from './CardForm';

//initial values
const initValues = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: 'MM',
  cardYear: 'YYYY',
  cardCvv: '',
  isCardFlipped: false
};

const App = () => {
  const [cardValues, setCardValues] = useState(initValues);
  //function to update values on the card, is send to cardFormat to be updated by user input
  // the values are sent to the card
  const updateCardValues = (key, value) => {
    setCardValues({
        ...cardValues, //spread operator
        [key]: value
    }); //re renders when state changes (user input)
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card card={cardValues}/>
      </View>
      <View style={styles.formContainer}>
        <CardForm card={cardValues} updateCard={updateCardValues} />
      </View>
      <View style={{ flex:1}}>
          <Button title="Submit"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    flex: 1,
    padding: 20,
    minHeight:250,
    maxHeight:250,
  },
  formContainer: {
  paddingTop: 20,
    flex: 4,
    minHeight:300,
    maxHeight:300,
  },
});

export default App;