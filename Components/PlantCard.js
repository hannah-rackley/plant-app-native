import React from 'react';
import { StyleSheet } from 'react-native';
import  { connect } from 'react-redux';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
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
    let date = format((parse(props.plant.last_watered)), 'MMM DD');
    let result = format(addDays(parse(props.plant.last_watered), props.plant.water_frequency), 'MMM DD');
    return (
        <Card>
            <CardItem>
                <Left>
                    <Body>
                        <Text>{props.plant.name}</Text>
                        <Text style={{ fontSize: 30 }}>Water: {result}</Text>
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