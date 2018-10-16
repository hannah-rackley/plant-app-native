import SERVER_URL from '../secrets';
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import  { connect } from 'react-redux';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Content, Text, Button, Icon, Body, SwipeRow, Card, CardItem} from 'native-base';
var styles = StyleSheet.create({
    body: {
        padding: 0,
        margin: 0,
    },
    pastDueCard: {
        flex: 1,
        marginLeft: 15,
        borderColor: '#d3d3d3',
        backgroundColor: '#CA5C54'
    },
    dueSoonCard: {
        flex: 1,
        marginLeft: 15,
        borderColor: '#d3d3d3',
        backgroundColor: '#f4f747'
    },
    dueLaterCard: {
        flex: 1,
        marginLeft: 15,
        borderColor: '#d3d3d3',
        backgroundColor: '#7da453',
    },
    whiteCardText: {
        color: 'white', 
        alignSelf: 'center'
    },
    blackCardText: {
        color: 'darkslategray', 
        alignSelf: 'center'
    },
    pastDue: {
        flex: 1,
        alignSelf: 'center',
        padding: 10,
        borderColor: '#d3d3d3',
        backgroundColor: '#CA5C54'
    },
    dueSoon: {
        flex: 1,
        alignSelf: 'center',
        padding: 10,
        borderColor: '#d3d3d3',
        backgroundColor: '#f4f747'
    },
    dueLater: {
        flex: 1,
        alignSelf: 'center',
        padding: 10,
        borderColor: '#d3d3d3',
        backgroundColor: '#7da453',
    }
  });

const PlantCard = ( props ) => {
    let currentCardColor, cardText, card;
    if (props.plant.minutesTilWater <= 1080) {
        currentCardColor = styles.pastDue;
        cardText = styles.whiteCardText;
        card = styles.pastDueCard;
    } else if (props.plant.minutesTilWater <= 2880) {
        currentCardColor = styles.dueSoon;
        cardText = styles.blackCardText;
        card = styles.dueSoonCard;
    } else {
        currentCardColor = styles.dueLater;
        cardText = styles.whiteCardText;
        card = styles.dueLaterCard;
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
    let result = format(parse(props.plant.water_next), 'MMM DD');
    let image_url = props.plant.selected_image_url;
    return (
        <Content scrollEnabled={false}>
            <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
            <Button style={{backgroundColor: 'rgba(0, 172, 193, 0.7)'}} onPress={updateWateredDate}>
                <FontAwesome active name="tint" solid style={{ fontSize: 25, color: 'white' }}/>
            </Button>
            }
            body={
                <Card style={card}>
                    <TouchableOpacity onPress={navigateToPlant}>
                        <CardItem style={{flex: 1}} style={currentCardColor}>
                            <Text style={cardText}>{props.plant.name}</Text>
                        </CardItem>
                        <CardItem style={currentCardColor}>
                            {image_url !== null ? <Image source={{uri: props.plant.selected_image_url}} style={{height: 200, width: 50, flex: 1}}/>: null}
                        </CardItem>
                        <CardItem style={currentCardColor}>
                            <Body>
                                <Text style={cardText}>Located in {props.plant.location}</Text>
                                <Text style={cardText}>Water Next: {result}</Text>
                            </Body>
                        </CardItem>
                    </TouchableOpacity>
                </Card>
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