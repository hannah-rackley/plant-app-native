import React from 'react';
import { Button, View } from 'react-native';
import { Permissions } from 'expo';

export default class ImagePickerScreen extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            hasImagePermission: null,
        }
    }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasImagePermission: status === 'granted' });
  }

  render() {
    const { hasImagePermission } = this.state;
    if (hasImagePermission === null) {
      return <View />;
    } else if (hasImagePermission === false) {
      return <Text>No access to images</Text>;
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            title="Pick an image from camera roll"
            onPress={this.props.pickImage}
            />
        </View>
        );
  }
}
}

