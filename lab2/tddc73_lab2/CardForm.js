import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropdownComponent from './DropDownList'

const CardForm = ({ card, updateCard }) => {

    //special case: want to format the cardNumber on the card but not in the form
    const [cardNumber, setCardNumber] = useState('');
    const updateCardNumber = (key, value) => {
        let cardNumber = value.replace(/[^0-9]/g, '');
        //Space between every forth number
        let cardNumber2 = cardNumber.replace(/(.{4})/g, '$1 ');
        setCardNumber(value);
        updateCard(key, cardNumber2);
    };
    const [cardHolder, setCardHolder] = useState('');
    const updateCardText = (key, value) => {
        let cardHolder = value.replace(/[^A-Za-z]/g, '');
        setCardHolder(value);
        updateCard(key, cardHolder);
    };
        const [cardCVV, setCardCVV] = useState('');
        const updateCardCVV = (key, value) => {
            let cardCVV = value.replace(/[^0-9]/g, '');
            setCardCVV(value);
            updateCard(key, cardCVV);
        };
    return (
        <View style={styles.container}>
            <Text>Card Number</Text>
            <TextInput style={styles.textInput}
                onChangeText={(text) => updateCardNumber('cardNumber', text )}
                value={cardNumber}
                maxLength={16}
                keyboardType="numeric"
            />
            <Text>Card Holder</Text>
            <TextInput style={styles.textInput}
                onChangeText={(text) => updateCardText('cardHolder', text)}
                Value={cardHolder}
                maxLength={30}
            />
            <View style={styles.row}>
                    <DropdownComponent card={cardNumber} updateCard={updateCard} />
                    <Text>CVV</Text>
                    <TextInput style={styles.textCVV}
                        onChangeText={(text) => updateCardCVV('cardCvv', text)}
                        onFocus={() => updateCard('isCardFlipped', true)}
                        onBlur={() => updateCard('isCardFlipped', false)}
                        maxLength={3}
                        textContentType="creditCardNumber"
                        value={cardCVV}
                        keyboardType="numeric"
                    />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({

    textInput: {
        marginTop: 5,
        marginBottom: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
    },

    textCVV: {
        height: 40,
        width: 130,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CardForm;