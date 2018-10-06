import React, {Component} from 'react';
import { Form, Label, Textarea, Input, Item, Picker, Icon, Container, Header, Content, DatePicker, Text, Title, Button } from 'native-base';
import { ScrollView, AsyncStorage, StyleSheet } from 'react-native';
import SERVER_URL from '../secrets'

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
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#b1bb6c',
        borderColor: '#b1bb6c',
    }
  });

class AddPlantScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            name: '',
            location: '',
            wateredDate: new Date(),
            light: undefined,
            days: '',
            notes: ''
         };
        this.onLightChange = this.onLightChange.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    setDate(newDate) {
        this.setState({ wateredDate: newDate });
    }

    onLightChange(light) {
        this.setState({light})
    }

    onPress() {
        AsyncStorage.getItem('id')
        .then((id) => {
            fetch(`${SERVER_URL}/api/add-plant`, {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: id,
                    name: this.state.name,
                    light: this.state.light,
                    lastWatered: this.state.wateredDate,
                    days: this.state.days,
                    location: this.state.location,
                    notes: this.state.notes
                })
            })
            .then((response) => {
                let response2 = response.text()
                return response2})
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    name: '',
                    location: '',
                    wateredDate: new Date(),
                    light: undefined,
                    days: '',
                    notes: ''
                })
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                throw error;
            })
        })
        .catch(error => {
            throw error;
        })
    }
  
    render() {
        return (
        <ScrollView>
            <Container>
                <Header>
                    <Title>New Plant</Title>
                </Header>
                <Content>
                    <Item>
                        <Input value={this.state.name} onChangeText={(name) => this.setState({name})} placeholder="Plant's Name"/>
                    </Item>
                    <Item>
                        <Input value={this.state.location} onChangeText={(location) => this.setState({location})} placeholder="Location"/>
                    </Item>
                    <Item>
                        <Input value={this.state.days} onChangeText={(days) => this.setState({days})} placeholder="Days between watering"/>
                    </Item>
                    <DatePicker
                        defaultDate={new Date(2018, 10, 1)}
                        minimumDate={new Date(2018, 1, 1)}
                        maximumDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Date Plant Last Watered"
                        textStyle={{ color: "#b1bb6c" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this.setDate}
                        />
                    <Text>
                        Date: {this.state.wateredDate.toString().substr(4, 12)}
                    </Text>
                    <Form>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-dropdown" />}
                                style={{ width: undefined }}
                                placeholder="Sunlight Needed"
                                placeholderStyle={{ color: "#b1bb6c" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.light}
                                onValueChange={this.onLightChange}
                            >
                                <Picker.Item label="Full Sun - min 6hr/day" value="Full Sun" />
                                <Picker.Item label="Partial Sun/Partial Shade - 3 to 6hr/day" value="Partial Sun" />
                                <Picker.Item label="Full Shade - max 3hr/day" value="Full Shade" />
                            </Picker>
                        </Item>
                    </Form>
                    <Form>
                        <Textarea value={this.state.notes} rowSpan={5} onChangeText={(notes) => this.setState({notes})} bordered placeholder="Notes" />
                    </Form>
                    <Button button style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Add</Text>
                    </Button>
                </Content>
            </Container>
        </ScrollView>
        )
    }
}

export default AddPlantScreen;