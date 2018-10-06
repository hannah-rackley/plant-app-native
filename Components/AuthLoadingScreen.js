import React from 'react';
import { View, AsyncStorage, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';

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

export default class AuthLoadingScreen extends React.Component {
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