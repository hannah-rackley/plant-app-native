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
import PhotoScreen from './Components/PhotoScreen'

let initialState = {
  plants: [],
  currentPlant: {}
}

const state = createStore(
    reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


const AppStack = createBottomTabNavigator({ Home: UserHomeScreen, 'Add Plant': AddPlantScreen, Signout: SignoutScreen})
const AuthSwitch = createSwitchNavigator({ Login: LoginScreen, Signup: SignupScreen })

const PlantNavigator = createBottomTabNavigator({ Info: PlantScreen, Photos: PhotoScreen})

const PlantStack = createStackNavigator({
    Plant: {
      screen: PlantNavigator,
    },
    Main: {
      screen: AppStack
    }, 
  },
    {
      mode: 'modal',
      headerMode: 'none',
    },
  {
    initialRouteName: 'Plant'
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
