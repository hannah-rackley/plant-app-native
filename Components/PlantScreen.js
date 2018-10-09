import React from 'react';
import { View, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
let styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#b1bb6c',
        borderColor: '#b1bb6c',
    }
  });

const PlantScreen = (props) => {
    customDateFormatter = (date) => [
        date.slice(6, 8),
        date.slice(9, 11),
        date.slice(1, 5)
      ].join('/')
    let date = customDateFormatter(JSON.stringify(props.plant.last_watered));
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>{props.plant.name}</Text>
            <Text style={{ fontSize: 30 }}>Last watered: {date}</Text>
            <Button button style={styles.button} onPress={() => props.navigation.navigate('Main')} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Home</Text>
            </Button>
        </View>
    );
}

const SmartPlantScreen = connect(state => ({ plant: state.currentPlant }))(PlantScreen)
export default SmartPlantScreen;