import React from 'react';
import { Image, AsyncStorage, ScrollView } from 'react-native';
import SERVER_URL from '../secrets';
import PlantCard from './PlantCard';
import { Container, Title, Header, Content } from 'native-base';
        
class UserHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: undefined,
    }
  }

  fetchPlants () {
    AsyncStorage.getItem('id')
    .then((id) => {
      fetch(`${SERVER_URL}/api/plants/${id}`, {
        method: "GET", 
        headers: {
          Accept: 'application/json'
        },
      })
      .then(response => {
        return response.text()})
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

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState)
  //   console.log(this.state.plants);
  // }
    
  render() {
    return (
      <Container>
        <Header>
          <Title>
            Thyme Tracker
          </Title>
        </Header>
        <Content>
          {this.state.plants !== undefined ? this.state.plants.map(plant => <PlantCard key={plant.id} plant={plant} /> ) : null}
        </Content>
    </Container>)

    }
  }   
export default UserHomeScreen;