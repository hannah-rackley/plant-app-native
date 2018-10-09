import React from 'react';
import { Image, AsyncStorage, ScrollView } from 'react-native';
import { connect } from 'react-redux';
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
        let data2 = JSON.parse(data);
        this.props.dispatch({ type: 'LOAD_USER_PLANTS', plants: data2 })
        this.setState({ plants: data2}) ;
      })
      .catch(error => {throw error})
    })
      .catch(error => {throw error})
  }

  componentDidMount() {
    this.fetchPlants();
  }

  componentDidUpdate() {
    if (this.props.render === true) {
      this.fetchPlants();
      this.props.dispatch({ type: 'ADDED_PLANT', render: false})
    }
  }

  componentWillUnmount() {

  }
    
  render() {
    return (
      <ScrollView>
        <Container>
          <Header>
            <Title>
              Thyme Tracker
            </Title>
          </Header>
          <Content>
            {this.state.plants !== undefined ? this.state.plants.map(plant => <PlantCard key={plant.id} plant={plant} navigate={this.props.navigation.navigate}/> ) : null}
          </Content>
      </Container>
      </ScrollView>)

    }
  }   

  const SmartUserHomeScreen = connect(state => state)(UserHomeScreen);

  export default SmartUserHomeScreen;