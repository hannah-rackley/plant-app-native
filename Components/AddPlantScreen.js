import React from 'react';
import { Text, View, TouchableHighlight, AsyncStorage, StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor:'#ffffff',
    },
    header: {
        height: 70,
        backgroundColor: '#b1bb6c',
        borderColor: '#b1bb6c',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#b1bb6c',
        borderColor: '#b1bb6c',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    }
  });


class AddPlantScreen extends React.Component {
    constructor(props) {
      super(props)

      this.onPress = this.onPress.bind(this);
    }

    onPress() {
        let value = false;
        if (value) {
        AsyncStorage.getItem('id')
        .then((id) => {
            fetch(`${SERVER_URL}/add-plant`, {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // user_id: id,
                    // name: value.name,
                    // light: value.howMuchSunDoesThisPlantRequire,
                    // // lastWatered: value.whenDidYouLastWaterThisPlant,
                    // waterFrequency: value.recommendedNumberOfDaysBetweenWatering,
                    // location: value.whereIsThisPlantLocatedInYourHome,
                    // notes: value.notes
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
            .catch(error => {
                throw error;
            })
        })
        }
    }
  
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>New Plant</Text>
                </View>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default AddPlantScreen;