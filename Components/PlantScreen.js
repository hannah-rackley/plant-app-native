import React from 'react';
import { View, Left, Text, Button, Body, Icon, Item, Textarea, DatePicker, Picker, Form, Input, Container, Content, Header, Title, ListItem, Separator } from 'native-base';
import { StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import addDays from 'date-fns/add_days';
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import ImagePickerScreen from './ImagePicker';
import { ImagePicker } from 'expo';

let styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#7da453',
        borderColor: '#7da453',
        alignSelf: 'center'
    },
    notes: {
        color: '#d3d3d3'
    }
  });

class PlantScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            id: this.props.plant.id,
            name: this.props.plant.name,
            location: this.props.plant.location,
            wateredDate: parse(this.props.plant.last_watered),
            light: this.props.plant.light,
            days: this.props.plant.water_frequency,
            notes: this.props.plant.notes,
            image: null,
         };
        this.onLightChange = this.onLightChange.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onPress = this.onPress.bind(this);
        this.pickImage = this.pickImage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.plant.id !== this.props.plant.id) {
            this.setState({
                id: this.props.plant.id,
                name: this.props.plant.name,
                location: this.props.plant.location,
                wateredDate: parse(this.props.plant.last_watered),
                light: this.props.plant.light,
                days: this.props.plant.water_frequency,
                notes: this.props.plant.notes,
                image: null,
            })
        }
    }

    setDate(newDate) {
        this.setState({ wateredDate: newDate });
    }

    onLightChange(light) {
        this.setState({light})
    }

    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

    onPress() {
        fetch(`${SERVER_URL}/api/update-plant`, {
            method: "PUT", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plant_id: this.props.plant.id,
                name: this.state.name,
                light: this.state.light,
                lastWatered: this.state.wateredDate,
                days: this.state.days,
                location: this.state.location,
                notes: this.state.notes, 
                image: this.state.image
            })
        })
        .then((response) => {
            let response2 = response.text()
            return response2})
        .then(() => {
            this.setState({
                image: null,
            })
            this.props.dispatch({ type: 'UPDATE_RENDER', render: true})
            // this.props.navigation.navigate('Home')
        })
        .catch(error => {
            throw error;
        })
    }
  
    render() {
        let { image } = this.state;
        let result = format(addDays(parse(this.state.wateredDate), this.state.days), 'MMM DD, YYYY');
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Title>{this.props.plant.name}</Title>
                </Header>
                <ScrollView>
                    <Content>
                        <Item>
                            <Text>Name: </Text>
                            <Input value={this.state.name} onChangeText={(name) => this.setState({name})} placeholder="Plant's Name"/>
                        </Item>
                        <Item>
                            <Text>Location: </Text>
                            <Input value={this.state.location} onChangeText={(location) => this.setState({location})} placeholder="Location"/>
                        </Item>
                        <Item>
                            <Text style={{paddingTop: 15, paddingBottom: 15}}>Water Next: {result}</Text>
                        </Item>
                        <Item>
                            <Text>Days between watering: </Text>
                            {this.state.days !== '' ?  
                            // <Item success>
                                <Input value={this.state.days} onChangeText={(days) => this.setState({days})}/>
                            //     <Icon name='checkmark-circle' />
                            // </Item> 
                            : 
                            // <Item error>
                                <Input value={this.state.days} onChangeText={(days) => this.setState({days})} placeholder="Required" placeholderTextColor="red"/>
                            //     <Icon name='close-circle' />
                            // </Item> }
                            }
                        </Item>
                        <DatePicker
                            defaultDate={parse(this.props.plant.last_watered)}
                            minimumDate={new Date(2018, 1, 1)}
                            maximumDate={new Date()}
                            locale={"us"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Click to update last watered date"
                            textStyle={{ color: "black" }}
                            onDateChange={this.setDate}
                            formatChosenDate={(date) => format(parse(date), 'MMM DD, YYYY')}
                            />
                        <Text style={{ marginLeft: 15}}>
                            Date: {format(parse(this.state.wateredDate.toString().substr(4, 12)), 'MMM DD, YYYY')}
                        </Text>
                        <Form style={{borderTopColor: 'rgba(0, 0, 0, 0.5)', borderTopWidth: 0.2, paddingTop: 10, paddingBottom: 10}}>
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
                        <Item style={{paddingTop: 10, paddingBottom: 10}}>
                            <Form>
                                <Text>Notes:</Text>
                                <Textarea value={this.state.notes} rowSpan={2} onChangeText={(notes) => this.setState({notes})} placeholder="Notes" />
                            </Form>
                        </Item>
                        <ImagePickerScreen pickImage={this.pickImage}/>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {image &&
                                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </View>
                        <Button button style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Update</Text>
                        </Button>
                        <Button style={styles.button} onPress={() => this.props.navigation.navigate('Main')}>
                            <Text style={styles.buttonText}>Back</Text>
                        </Button>
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}

const SmartPlantScreen = connect(state => ({ plant: state.currentPlant, dispatch: state.dispatch }))(PlantScreen)
export default SmartPlantScreen;