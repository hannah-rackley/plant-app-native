import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignupScreen'
import SignoutScreen from './Components/SignoutScreen';
import UserHomeScreen from './Components/UserHomeScreen';
import AuthLoadingScreen from './Components/AuthLoadingScreen';
import AppLoadingScreen from './Components/AppLoadingScreen';
import AddPlantScreen from './Components/AddPlantScreen';

const AppStack = createBottomTabNavigator({ Home: UserHomeScreen, 'Add Plant': AddPlantScreen, Signout: SignoutScreen})
const AuthStack = createSwitchNavigator({ Login: LoginScreen, Signup: SignupScreen })

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

