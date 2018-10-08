import React from 'react';
import { Image } from 'react-native';
import SERVER_URL from '../secrets';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
  
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: undefined
    }
  }

  fetchPlants() {
    AsyncStorage.getItem('id')
    .then((id) => {
      fetch(`${SERVER_URL}/api/plants/${id}`, {
        method: "GET", 
        headers: {
          Accept: 'application/json'
        },
      })
      .then(response => response.text())
      .then(data => {
        this.setState({ plants: JSON.parse(data)}) ;
      })
      .catch(error => {throw error})
    })
      .catch(error => {throw error})
  }

  componentDidMount() {
    this.fetchPlants();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    // if (prevProps.match.params.user_id !== this.props.match.params.user_id) {
    //   this.fetchImages();
    // }
  }

  render() {
    return (
      <Container>
      <Header>
        <Title>
          Thyme Tracker
        </Title>
      </Header>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>{plant.name}</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>)

    }
  }

  export default HomeScreen;