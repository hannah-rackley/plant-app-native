import React, {Component} from 'react';
import { Text, TouchableHighlight, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Title } from 'native-base';
import { multiSaveItem, saveItem } from '../deviceStorage';
import SERVER_URL from '../secrets'

const styles = StyleSheet.create({
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
  },
    button: {
      height: 36,
      backgroundColor: '#b1bb6c',
      borderColor: '#b1bb6c',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 15,
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
            // multiSaveItem('token', responseData.token, 'id', responseData.id)
            saveItem('token', responseData.token)
            .then(() => {
              // Alert.alert('Login success!')
              (AsyncStorage.getItem('token'))
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
          <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => {this.props.navigation.navigate('Signup')}} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Not a member? Signup!</Text>
          </TouchableHighlight>
        </Content>
      </Container>
    )
  }
}

export default LoginScreen;