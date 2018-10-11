import React from 'react';
import { View, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse'
import format from 'date-fns/format'

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
    let result = format(addDays(parse(props.plant.last_watered), props.plant.water_frequency), 'MMM DD');
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>{props.plant.name}</Text>
            <Text style={{ fontSize: 30 }}>Water: {result}</Text>
            <Text style={{ fontSize: 30 }}>Sunlight Requirements {props.plant.light}</Text>
            <Text style={{ fontSize: 30 }}>{props.plant.water_frequency}</Text>
            <Text style={{ fontSize: 30 }}>Notes: {props.plant.notes}</Text>

            <Button button style={styles.button} onPress={() => props.navigation.navigate('Main')} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Home</Text>
            </Button>
        </View>
    );
}

const SmartPlantScreen = connect(state => ({ plant: state.currentPlant }))(PlantScreen)
export default SmartPlantScreen;