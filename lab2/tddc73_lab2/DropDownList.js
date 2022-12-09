 import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';

  const month = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

    const year = [
      { label: '2022', value: '2022' },
      { label: '2023', value: '2023' },
      { label: '2024', value: '2024' },
      { label: '2025', value: '2025' },
      { label: '2026', value: '2026' },
      { label: '2027', value: '2027' },

    ];

  const DropdownComponent = ({ card, updateCard }) => {
    return (
    <View>
    <Text style={styles.textExp}>Expiration Date</Text>
    <View style={styles.row}>
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={month}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Month"
            value={card.cardMonth}
            onChange={month => {
            updateCard('cardMonth', month.value);
            }}
        />
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={year}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Year"
            value={card.cardYear}
            onChange={year => {
            updateCard('cardYear',year.value);
            }}
        />
    </View>
</View>
    );
  };
  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      width: 100,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      padding:10
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });