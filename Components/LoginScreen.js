import React, {Component} from 'react';
import { Text, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Title, Button } from 'native-base';
import { multiSaveItem } from '../deviceStorage';
import SERVER_URL from '../secrets'

const styles = StyleSheet.create({
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
  },
    button: {
      backgroundColor: '#b1bb6c',
      borderColor: '#b1bb6c',
  }
  });

  
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this._userLogin = this.userLogin.bind(this)
  }

  userLogin() {
    if (this.state.password !== '' && this.state.email !== '') {
        fetch(`${SERVER_URL}/login`, {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password, 
            })
        })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData)
            multiSaveItem('token', responseData.token, 'id', responseData.id.toString())
            .then(() => {
              // Alert.alert('Login success!')
              (AsyncStorage.getItem('id'))
              .then((token) => console.log(token))
            })
            .then(() => {
                this.props.navigation.navigate('App')
            })
            .catch(error => {
              console.log('Login error' + error.message);
            })
        })
        .catch(error => {
          console.log('error' + error.message);
        })
    }
  }

  render() {
    return (
      <Container>
        <Header> 
          <Title> Login</Title>
        </Header>
        <Content>
          <Form ref="form">
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({email})}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input onChangeText={(password) => this.setState({password})}/>
              </Item>
            </Form>
          <Button block onPress={this._userLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
          </Button>
          <Button transparent block onPress={() => {this.props.navigation.navigate('Signup')}}>
              <Text >Not a member? Signup!</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default LoginScreen;