import t from 'tcomb-form-native';
import { saveItem } from '../deviceStorage'
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';

let STORAGE_KEY = 'token';

export const User = t.struct({
  email: t.String,
  password: t.String,
})

export const userSignup = () => {
    var value = this.refs.form.getValue();
    if (value) {
        fetch("http://localhost:5000/signup", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: value.email, 
                password: value.password, 
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            saveItem(STORAGE_KEY, responseData.token)
            .then(() => {
                console.log(AsyncStorage.getItem('token'));
                Alert.alert('Login success!')
            })
            // .then(() => {
            //     AlertIOS.alert(
            //         "Success!"
            //         )
            // })
        })
    }
}