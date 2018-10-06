import React from 'react';
import { Text, View, TouchableHighlight, AsyncStorage, StyleSheet } from 'react-native';
import { saveItem } from '../deviceStorage';
import { Container, Header, Content, Form, Item, Input, Label, Title } from 'native-base';
import SERVER_URL from '../secrets'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor:'#ffffff',
    },
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
    },
    signup: {
        height: 70,
        backgroundColor: '#b1bb6c',
        borderColor: '#b1bb6c',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 100,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    signupText: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    }
  });

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
      };
    this._userSignup = this.userSignup.bind(this)
  }

  userSignup() {
    if (this.state.password !== '' && this.state.email !== '')
        fetch(`${SERVER_URL}/signup`, {
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
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            saveItem('token', responseData.token);
        })
            // .then(() => {
            //   (AsyncStorage.getItem('token'))
            //   .then((token) => console.log(token))
            // })
            .then(() => {
                this.props.navigation.navigate('App')
            })
            .catch(error => {
              console.log('Signup error' + error.message);
              throw error;
            })
        .catch(error => {
          console.log('Signup error' + error.message);
          throw error;
        })
    }

  render() {
    return (
      <Container>
      <Header> 
        <Title>Signup</Title>
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
        <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => {this.props.navigation.navigate('Login')}} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Already a member? Login!</Text>
        </TouchableHighlight>
      </Content>
    </Container>
    )
  }
}

export default SignupScreen;