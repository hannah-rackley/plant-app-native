import React from 'react';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


const PlantCard = (props) => {
    return (
        <Card>
            <CardItem>
                <Left>
                    <Body>
                        <Text>{props.plant.name}</Text>
                        <Text note>Last Watered: {props.plant.last_watered}</Text>
                    </Body>
                </Left>
            </CardItem>
        </Card>
    )
}

export default PlantCard;