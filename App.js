import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './Components/LoginScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    color: '#ffcdd2',
    marginBottom: '5px'
  }
});


let HomeScreen = () => {
  return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button 
            style={styles.button}
            title="Hello" 
            color="#b1bb6c"
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
      <View style={styles.container}>
        <Button title="Actually, sign me out :)" onPress={this._clearStorage} />
      </View>
    );
  }
}

const AppStack = createBottomTabNavigator({ Home: HomeScreen, Profile: ProfileScreen, Signout: SignoutScreen})
const AuthStack = createStackNavigator({ Login: LoginScreen })

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._getToken();
  }

  //Fetch token from asynstorage if it has been stored
  _getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barstyle="default" />
      </View>
    );
  }
}

// let App = createBottomTabNavigator({
//   Login: LoginScreen,
//   Home: HomeScreen, 
//   Profile: ProfileScreen
// })

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen, 
    App: AppStack, 
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

