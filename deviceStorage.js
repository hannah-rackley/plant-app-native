import { AsyncStorage } from 'react-native';

export const saveItem = (item, selectedValue) => {
    return AsyncStorage.setItem(item, selectedValue)
}