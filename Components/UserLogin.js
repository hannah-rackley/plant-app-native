import { saveItem } from '../deviceStorage'

let STORAGE_KEY = 'token';

export const userLogin = () => {
    var value = this.refs.form.getValue();
    if (value) {
        fetch("http://localhost:5000/login", {
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
            saveItem(STORAGE_KEY, responseData.token)
            .then(() => {
                AlertIOS.alert(
                    "Success!"
                    )
            })
        })
    }
}