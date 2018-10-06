import { AsyncStorage } from 'react-native';

export const multiSaveItem = (item, selectedValue, item2, selectedValue2) => {
    return AsyncStorage.multiSet([[item, selectedValue], [item2, selectedValue2]])
}

export const saveItem = (item, selectedValue) => {
    return AsyncStorage.setItem(item, selectedValue)
}