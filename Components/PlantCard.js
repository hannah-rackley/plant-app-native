import SERVER_URL from '../secrets';
import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import  { connect } from 'react-redux';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { Card, CardItem, Text, Button, Left, Right, Body } from 'native-base';
var styles = StyleSheet.create({
    buttonText: {
        color: 'blue',
        alignSelf: 'center'
    },
    card: { 
        fontSize: 20, 
        color: 'white', 
        alignSelf: 'center' 
    },
    button: {
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    pastDue: {
        backgroundColor: '#e57373',
    },
    dueSoon: {
        backgroundColor: '#e1ffb1'
    },
    dueLater: {
        backgroundColor: '#7da453',
    }
  });

const PlantCard = ( props ) => {
    console.log(props);
    let currentCardColor;
    if (props.plant.daysTilWater <= 0) {
        currentCardColor = styles.pastDue;
    } else if (props.plant.daysTilWater <=1) {
        currentCardColor = styles.dueSoon;
    } else {
        currentCardColor = styles.dueLater
    }
    const navigateToPlant = () => {
        props.dispatch({ type: 'UPDATE_CURRENT_PLANT', plant: props.plant });
        props.navigate('Plant');
    }
    const updateWateredDate = () => {
        AsyncStorage.getItem('id')
        .then(id => {
            fetch(`${SERVER_URL}/api/update-watered`, {
                method: "PUT", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    plant_id: props.plant.id,
                    last_watered: new Date(),
                })
            })
            .then(() => {
                props.dispatch({ type: 'ADDED_PLANT', render: true })
            })
              .catch(error => {throw error})
        })
            .catch(error => {throw error})
    }

    let date = format((parse(props.plant.last_watered)), 'MMM DD');
    let result = format(parse(props.plant.water_next), 'MMM DD');
    console.log(result);
    return (
        <Card style={currentCardColor}>
            <CardItem style={currentCardColor} button onPress={navigateToPlant}>
                <Left>
                    <Body>
                        <Text style={styles.card}>{props.plant.name}</Text>
                        <Text style={styles.card}>{props.plant.location}</Text>
                        <Text style={styles.card}>Water: {result}</Text>
                    </Body>
                </Left>
                <Right>
                    <Body>
                        <Button button style={styles.button} onPress={updateWateredDate}>
                            <Text style={styles.buttonText}>Watered Now</Text>
                        </Button>
                    </Body>
                </Right>
            </CardItem>
        </Card>
    )
}
const SmartPlantCard = connect(state =>  ({ dispatch: state.dispatch }))(PlantCard);

export default SmartPlantCard;