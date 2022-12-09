import React, { useEffect, useState, useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';

import visa from './assets/visa.png';
import amex from './assets/amex.png';
import discover from './assets/discover.png';
import mastercard from './assets/mastercard.png';
import troy from './assets/troy.png';

const image = require('./assets/8.jpeg');
const chip = require('./assets/chip.png');

const Card = ({ card }) => {
    //reused logic from https://codepen.io/JavaScriptJunkie/pen/YzzNGeR
    //return different images depending on the expression
    const getCardType = () => {
        let number = card.cardNumber;
        if(number != null){
            if (number.match(RegExp("^4")) != null) return visa;
            if (number.match(RegExp("^(34|37)")) != null) return amex;
            if (number.match(RegExp("^5[1-5]")) != null) return mastercard;
            if (number.match(RegExp("^6011")) != null) return discover;
            if (number.match(RegExp('^9792')) != null) return troy;
        }
        return visa;
    };
    cardType = getCardType();

    const Front = () => {
        return (
            <ImageBackground source={image} style={styles.card}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <Image source={chip} style={styles.chip} />
                        <Image source={cardType} style={styles.cardType} />
                    </View>
                    <Text style={styles.number}>{card.cardNumber}</Text>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.smallText}>Card Holder</Text>
                            <Text style={styles.smallText}>
                                {card.cardHolder}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.smallText}>Expires</Text>
                            <Text style={styles.smallText}>
                                {card.cardMonth}/
                                {card.cardYear.substring(2,4)}
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    };

    const Back = () => {
        return (
            <ImageBackground source={image} style={styles.card}>
                <Text style={styles.stripe}></Text>
                <View style={styles.backInfo}>
                    <Text style={styles.smallText}>CVV</Text>
                    <View style={styles.cvv}>
                        <Text>{card.cardCvv}</Text>
                    </View>
                    <Image source={cardType} style={styles.cardType} />
                </View>
            </ImageBackground>
        );
    };

    return card.isCardFlipped ? <Back/> : <Front/>;
};

const styles = StyleSheet.create({
    column: {
        flex: 1,
        justifyContent: 'space-around',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:10
    },
    card: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    smallText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    number: {
        color: 'white',
        fontSize: 25,
        letterSpacing: 3,
        paddingLeft: 20,
    },
    chip: {
        width: 50,
        height: 40,
        resizeMode: 'contain',
    },
    cardType: {
        width: 110,
        height: 50,
        resizeMode: 'contain',
    },
    stripe: {
        marginTop: 20,
        fontSize: 42,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
    },
    backInfo: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        padding: 10,

    },
    cvv: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
    },
});

export default Card;