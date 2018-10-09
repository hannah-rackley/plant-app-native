const loadUserPlants = (oldState, action) => {
    return {
        ...oldState, 
        plants: action.plants
    }
}

const addedPlantCheck = (oldState, action) => {
    return {
        ...oldState, 
        render: action.render
    }
}

const reducerRouter = {
    'LOAD_USER_PLANTS': loadUserPlants,
    'ADDED_PLANT': addedPlantCheck
}

const reducer = (oldState, action) => {
    let actionType = reducerRouter[action.type];
    if (actionType) {
        return actionType(oldState, action);
    } else {
        return oldState;
    }
}

export default reducer;