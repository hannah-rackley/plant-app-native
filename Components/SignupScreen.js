import React from 'react';
import { Text, AsyncStorage, StyleSheet } from 'react-native';
import { multiSaveItem } from '../deviceStorage';
import { Container, Header, Content, Form, Item, Input, Label, Title, Button } from 'native-base';
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
            multiSaveItem('token', responseData.token, 'id', responseData.id.toString());
        })
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
        <Button block style={styles.button} onPress={this._userSignup}>
            <Text style={styles.buttonText}>Signup</Text>
        </Button>
        <Button transparent block onPress={() => {this.props.navigation.navigate('Login')}}>
            <Text>Already a member? Login!</Text>
        </Button>
      </Content>
    </Container>
    )
  }
}

export default SignupScreen;