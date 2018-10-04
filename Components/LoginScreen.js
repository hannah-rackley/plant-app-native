import React from 'react';
import { Text, View, Button, AsyncStorage, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { saveItem } from '../deviceStorage';
import SERVER_URL from '../secrets'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        color: '#ffcdd2',
        marginBottom: '5px'
    },
    login: {
        backgroundColor:'#b1bb6c',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxHeight: '15%',
        marginBottom: 10
    }
  });

const User = t.struct({
    email: t.String,
    password: t.String
  })

const Form = t.form.Form;

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
            .then(() => {
                this.props.navigation.navigate('App')
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
      <View style={styles.container}>
        <View style={styles.login}>
            <Text>Login</Text>
        </View>
        <Form 
        ref="form"
        type={User}
        style={styles.form} />
        <View style={styles.container}>
            <Button 
            style={styles.button}
            title="Login" 
            color="#b1bb6c"
            onPress={this._userLogin} />
            <Button 
            style={styles.button}
            title ="Signup" 
            onPress={this._userSignup} 
            color='#b1bb6c'/>
        </View>
      </View>
    )
  }
}

export default LoginScreen;