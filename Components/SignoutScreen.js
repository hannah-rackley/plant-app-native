import React from 'react';
import { View, Button, AsyncStorage, StyleSheet } from 'react-native';

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
          <Button button danger rounded title="Sign Out" onPress={this._clearStorage} />
        </View>
      );
    }
  }

export default SignoutScreen;