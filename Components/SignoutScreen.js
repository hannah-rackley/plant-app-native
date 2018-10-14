import React from 'react';
import { AsyncStorage } from 'react-native';
import {  Button, Text, Container, Header, Title, Content } from 'native-base';

class SignoutScreen extends React.Component {
    constructor(props) {
      super(props);
    }
  
    _clearStorage = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      }
  
    render() {
      return (
        <Container>
            <Header>
              <Title>Sign Out</Title>
            </Header>
          <Content style={{marginTop: '50%'}}>
            <Button block danger onPress={this._clearStorage} style={{padding: 50}}>
              <Text style={{fontSize: 30}}>SIGN OUT</Text>
            </Button>
          </Content>
      </Container>
      );
    }
  }

export default SignoutScreen;