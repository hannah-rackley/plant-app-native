import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Alert } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { User } from './Components/UserSignup';
import t from 'tcomb-form-native';
import { saveItem } from './deviceStorage';
import SERVER_URL from './secrets.js'

const STORAGE_KEY = 'token';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffce',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    color: '#ffcdd2',
    marginBottom: '5px'
  },
  form: {
    backgroundColor: '#fff'
  }
});

const Form = t.form.Form;

let HomeScreen = () => {
  return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button 
            style={styles.button}
            title="Hello" 
            color="#ffcdd2"
            onPress={() =>  console.log('hi')} />
      </View>
    )
}

let ProfileScreen = () => {
  return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    )
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this._userLogin = this.userLogin.bind(this)
    this._userSignup = this.userSignup.bind(this)
  }

  userSignup() {
    var value = this.refs.form.getValue();
    if (value) {
        fetch(`${SERVER_URL}/signup`, {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: value.email, 
                password: value.password, 
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            saveItem('token', responseData.token)
            .then(() => {
              // Alert.alert('Signup success!');
              (AsyncStorage.getItem('token'))
              .then((token) => console.log(token))
            })
            .catch(error => {
              console.log('Signup error' + error.message);
              throw error;
            })
        })
        .catch(error => {
          console.log('Signup error' + error.message);
          throw error;
        })
    }
  }

  userLogin() {
    var value = this.refs.form.getValue();
    if (value) {
        fetch(`${SERVER_URL}/login`, {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: value.email, 
                password: value.password, 
            })
        })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
            saveItem(STORAGE_KEY, responseData.token)
            .then(() => {
              // Alert.alert('Login success!')
              (AsyncStorage.getItem('token'))
              .then((token) => console.log(token))
            })
            .catch(error => {
              console.log('Login error' + error.message);
              throw error;
            })
        })
        .catch(error => {
          console.log('error' + error.message);
          throw error;
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Form 
        ref="form"
        type={User}
        styles={styles.form} />
        <View>
            <Button 
            style={styles.button}
            title="Login" 
            color="#ffcdd2"
            onPress={this._userLogin} />
            <Button 
            style={styles.button}
            title ="Signup" 
            onPress={this._userSignup} 
            color='#ffcdd2'/>
        </View>
      </View>
    )
  }
}

let App = createBottomTabNavigator({
  Home: HomeScreen, 
  Profile: ProfileScreen,
  Login: LoginScreen
})

export default App;

