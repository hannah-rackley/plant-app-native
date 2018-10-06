import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
  
  
const UserHomeScreen = () => {
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
export default UserHomeScreen;