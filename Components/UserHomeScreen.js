import React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse';
import SERVER_URL from '../secrets';
import PlantCard from './PlantCard';
import { Container, Title, Header, Content } from 'native-base';
import { differenceInMinutes } from 'date-fns';
        
class UserHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.sortPlants = this.sortPlants.bind(this);
  }
  sortPlants(plants) {
    let updatedPlants = plants.map(plant => {
      let result = addDays(parse(plant.last_watered), plant.water_frequency);
      let minutesTilWater = differenceInMinutes(result, new Date());
      return {...plant, water_next: result, minutesTilWater: minutesTilWater};
    })
    compare = (a, b) => {
      let comparison = 0;
      if (a.minutesTilWater > b.minutesTilWater) {
        comparison = 1;
      } else if (b.minutesTilWater > a.minutesTilWater) {
        comparison = -1;
      }
      return comparison;
    }
    let sortedPlants = updatedPlants.sort(compare);
    return sortedPlants;
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
        let plants = JSON.parse(data);
        let sortedPlants = this.sortPlants(plants);
        this.props.dispatch({ type: 'LOAD_USER_PLANTS', plants: sortedPlants })
      })
      .catch(error => {throw error})
    })
      .catch(error => {throw error})
  }

  componentDidMount() {
    this.fetchPlants()
  }

  componentDidUpdate() {
    if (this.props.render === true) {
      console.log('re-render');
      this.fetchPlants();
      this.props.dispatch({ type: 'UPDATE_RENDER', render: false})
    }
  }
    
  render() {
    return (
        <Container>
          <Header>
            <Title>
              Thyme Tracker
            </Title>
          </Header>
          <ScrollView>
            <Content>
              {this.props.plants !== undefined ? this.props.plants.map(plant => <PlantCard key={plant.id} plant={plant} navigate={this.props.navigation.navigate}/> ) : null}
            </Content>
          </ScrollView>
        </Container>)

    }
  }   

  const SmartUserHomeScreen = connect(state => state)(UserHomeScreen);

  export default SmartUserHomeScreen;