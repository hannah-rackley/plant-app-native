import React from 'react';
import { StyleSheet } from 'react-native';
import  { connect } from 'react-redux';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
var styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#b1bb6c',
        borderColor: '#b1bb6c',
    }
  });

const PlantCard = ( props ) => {
    const navigateToPlant = () => {
        props.dispatch({ type: 'UPDATE_CURRENT_PLANT', plant: props.plant });
        props.navigate('Plant');
    }
    customDateFormatter = (date) => [
        date.slice(6, 8),
        date.slice(9, 11),
        date.slice(1, 5)
      ].join('/')
    let date = customDateFormatter(JSON.stringify(props.plant.last_watered));
    return (
        <Card>
            <CardItem>
                <Left>
                    <Body>
                        <Text>{props.plant.name}</Text>
                        <Text note>Last Watered: {date}</Text>
                    </Body>
                </Left>
            </CardItem>
            <Button button style={styles.button} onPress={navigateToPlant} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Info</Text>
            </Button>
        </Card>
    )
}
const SmartPlantCard = connect(state =>  ({ dispatch: state.dispatch }))(PlantCard);

export default SmartPlantCard;