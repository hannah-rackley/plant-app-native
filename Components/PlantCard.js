import SERVER_URL from '../secrets';
import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import  { connect } from 'react-redux';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Content, Text, Button, Icon, Body, SwipeRow, View, ListItem, CardItem} from 'native-base';
var styles = StyleSheet.create({
    body: {
        padding: 0,
        margin: 0,
    },
    cardText: {
        color: 'white', 
        fontSize: 20,
        alignSelf: 'center'
    },
    pastDue: {
        alignSelf: 'center',
        padding: 10,
        marginLeft: 15,
        borderColor: '#d3d3d3',
        backgroundColor: '#CA5C54'
    },
    dueSoon: {
        alignSelf: 'center',
        padding: 10,
        marginLeft: 15,
        borderColor: '#d3d3d3',
        backgroundColor: '#e1ffb1'
    },
    dueLater: {
        alignSelf: 'center',
        padding: 10,
        marginLeft: 15,
        borderColor: '#d3d3d3',
        backgroundColor: '#7da453',
    }
  });

const PlantCard = ( props ) => {
    let currentCardColor;
    if (props.plant.daysTilWater <= 0) {
        currentCardColor = styles.pastDue;
    } else if (props.plant.daysTilWater <=1) {
        currentCardColor = styles.dueSoon;
    } else {
        currentCardColor = styles.dueLater
    }
    const deletePlant = () => {
        fetch(`${SERVER_URL}/api/delete-plant`, {
            method: "DELETE", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plant_id: props.plant.id,
            })
        })
        .then(() => {
            props.dispatch({ type: 'UPDATE_RENDER', render: true })
        })
            .catch(error => {throw error})
    }

    const navigateToPlant = () => {
        props.dispatch({ type: 'UPDATE_CURRENT_PLANT', plant: props.plant });
        props.navigate('Plant');
    }

    const updateWateredDate = () => {
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
            props.dispatch({ type: 'UPDATE_RENDER', render: true })
        })
            .catch(error => {throw error})
    }

    // let date = format((parse(props.plant.last_watered)), 'MMM DD');
    let result = format(parse(props.plant.water_next), 'dddd, MMM DD');

    return (
        <Content>
            <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
            <Button style={{backgroundColor: 'rgba(0, 172, 193, 0.7)'}} onPress={updateWateredDate}>
                <FontAwesome active name="tint" solid style={{ fontSize: 25, color: 'white' }}/>
            </Button>
            }
            body={
                <CardItem button onPress={navigateToPlant} style={currentCardColor} >
                    <Body>
                        <Text style={styles.cardText}>{props.plant.name}</Text>
                        <Text style={styles.cardText}>Located in {props.plant.location}</Text>
                        <Text style={styles.cardText}>Water Next: {result}</Text>
                    </Body>
                </CardItem>
            }
            right={
            <Button danger onPress={deletePlant}>
                <Icon active name="trash" />
            </Button>}
            />
        </Content>
    )
}
const SmartPlantCard = connect(state =>  ({ dispatch: state.dispatch }))(PlantCard);

export default SmartPlantCard;