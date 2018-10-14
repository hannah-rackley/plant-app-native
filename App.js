import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignupScreen'
import SignoutScreen from './Components/SignoutScreen';
import UserHomeScreen from './Components/UserHomeScreen';
import AuthLoadingScreen from './Components/AuthLoadingScreen';
import AddPlantScreen from './Components/AddPlantScreen';
import PlantScreen from './Components/PlantScreen'
import reducer from './reducer'
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import CameraScreen from './Components/CameraScreen';

let initialState = {
  plants: [],
  currentPlant: {}
}

const state = createStore(
    reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


const AppStack = createBottomTabNavigator({ Home: UserHomeScreen, 'Add Plant': AddPlantScreen, Signout: SignoutScreen})
const AuthSwitch = createSwitchNavigator({ Login: LoginScreen, Signup: SignupScreen })

const PlantStack = createStackNavigator({
    Plant: {
      screen: PlantScreen,
    },
    Main: {
      screen: AppStack
    }, 
  },
    {
      mode: 'modal',
      headerMode: 'none'
    },
  {
    initialRouteName: 'Main'
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen, 
    App: AppStack, 
    Auth: AuthSwitch,
    Plant: PlantStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={state}>
        <AppNavigator />
      </Provider>
    )
  }
}
