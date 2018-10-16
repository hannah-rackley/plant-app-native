import React from 'react';
import { View, Left, Right, Icon, Text, Button, Item, Textarea, DatePicker, Picker, Form, Input, Container, Content, Header, Title } from 'native-base';
import { StyleSheet, ScrollView, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

class PhotoScreen extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            photos: this.props.plant.image_array
        }
        this.onPress = this.onPress.bind(this);
    }

    componentDidUpdate(prevProps) {
        if( prevProps.plant.id !== this.props.plant.id) {
            this.setState({
                photos: this.props.plant.image_array
            })
        } else if ( prevProps.plant.image_array.length !== this.props.plant.image_array.length) {
            this.setState({
                photos: this.props.plant.image_array
            })
        }
    }

    onPress () {
        this.setState({
            photos: [],
        })
        this.props.navigation.navigate('Main')
    }
    render() {
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Left>
                        <Title>{this.props.plant.name}'s Photos</Title>
                    </Left>
                    <Right>
                        <Button style={{backgroundColor: 'rgba(0, 0, 0, 0)', alignSelf: 'center', marginBottom: 10}}iconLeft onPress={this.onPress}>
                            <FontAwesome active name="home" solid style={{ fontSize: 30, alignSelf: 'center' }}/>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    <Content>
        {this.state.photos !== null ? this.state.photos.slice(0).reverse().map(photo => {
            if (photo !== null) {
            return <Image key={photo} source={{ uri: photo}} style={{ width: 300, height: 300, alignSelf: 'center', margin: 10 }}></Image>}}) : <Text>No photos</Text>}
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}

const SmartPhotoScreen = connect(state => ({ plant: state.currentPlant }))(PhotoScreen)
export default SmartPhotoScreen;