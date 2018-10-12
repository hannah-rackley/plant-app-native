import React from 'react';
import { View, Text, Button, Item, Container, Content, Header, Title } from 'native-base';
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
        alignSelf: 'flex-start'
    }
  });

const PlantScreen = (props) => {
    let result = format(addDays(parse(props.plant.last_watered), props.plant.water_frequency), 'MMM DD, YYYY');
    
    return (
        <Container>
            <Header> 
                <Title>{props.plant.name}</Title>
            </Header>
            <Content>
                <Text style={{ fontSize: 30 }}>Water Next: {result}</Text>
                <Text style={{ fontSize: 30 }}>Sunlight Requirements: {props.plant.light}</Text>
                <Text style={{ fontSize: 30 }}>Water every {props.plant.water_frequency} day(s)</Text>
                {props.plant.notes.length > 0 ? <Text style={{ fontSize: 30 }}>Notes: {props.plant.notes}</Text> : null}
                <Button button style={styles.button} onPress={() => props.navigation.navigate('Main')} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Home</Text>
                </Button>
            </Content>
        </Container>
    );
}

const SmartPlantScreen = connect(state => ({ plant: state.currentPlant, dispatch: state.dispatch }))(PlantScreen)
export default SmartPlantScreen;