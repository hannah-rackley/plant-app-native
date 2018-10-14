const loadUserPlants = (oldState, action) => {
    return {
        ...oldState, 
        plants: action.plants
    }
}

const updateRender = (oldState, action) => {
    return {
        ...oldState, 
        render: action.render
    }
}

const updateCurrentPlant = (oldState, action) => {
    return {
        ...oldState, 
        currentPlant: action.plant
    }
}

const reducerRouter = {
    'LOAD_USER_PLANTS': loadUserPlants,
    'UPDATE_RENDER': updateRender,
    'UPDATE_CURRENT_PLANT': updateCurrentPlant
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