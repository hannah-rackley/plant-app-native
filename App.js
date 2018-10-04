import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignupScreen'
import SignoutScreen from './Components/SignoutScreen';
import UserHomeScreen from './Components/UserHomeScreen';
import AuthLoadingScreen from './Components/AuthLoadingScreen';

const AppStack = createBottomTabNavigator({ Home: UserHomeScreen, Signout: SignoutScreen})
const AuthStack = createStackNavigator({ Login: LoginScreen, SignupScreen: SignupScreen })

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

