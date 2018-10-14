import React from 'react';
import { View, Left, Text, Button, Body, Item, Container, Content, Header, Title, ScrollView, ListItem, Separator } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import ImagePickerScreen from './ImagePicker';

let styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#7da453',
        borderColor: '#7da453',
        alignSelf: 'center'
    },
    notes: {
        color: '#d3d3d3'
    }
  });

const PlantScreen = (props) => {
    let result = format(addDays(parse(props.plant.last_watered), props.plant.water_frequency), 'MMM DD, YYYY');
    
    return (
        <Container>
            <Header> 
                <Body>
                    <Title>{props.plant.name}</Title>
                </Body>
            </Header>
            <Content>
                <Separator bordered>
                    <Text>Sunlight Requirements</Text>
                </Separator>
                <ListItem>
                    <Text>{props.plant.light}</Text>
                </ListItem>
                <Separator bordered>
                    <Text>Water Schedule</Text>
                </Separator>
                <ListItem>
                    <Text>Last Watered: {format(parse(props.plant.last_watered), 'MMM DD, YYYY')}</Text>
                </ListItem>
                <ListItem>
                    <Text>Water Next: {result}</Text>
                </ListItem>
                <ListItem last>
                    <Text>Days between watering: {props.plant.water_frequency}</Text>
                </ListItem>
                <Separator bordered>
                    <Text>Notes</Text>
                </Separator>
                <ListItem last>
                    {props.plant.notes.length > 0 ? <Text>{props.plant.notes}</Text> : <Text style={styles.notes}>No notes</Text>}
                </ListItem>
                <Button style={styles.button} onPress={() => props.navigation.navigate('Main')}>
                    <Text style={styles.buttonText}>Back</Text>
                </Button>
            </Content>
        </Container>
    );
}

const SmartPlantScreen = connect(state => ({ plant: state.currentPlant, dispatch: state.dispatch }))(PlantScreen)
export default SmartPlantScreen;