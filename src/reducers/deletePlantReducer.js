import {
    DELETE_IN_PROGRESS, 
    DELETE_PLANT_SUCCESS 
} from '../actions/deleteActions';

const initialState = {
    deletingPlant: false,
    plants: []
}

export const deletePlantReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_IN_PROGRESS:
            return {
                ...state,
                deletingPlant: true,
            }
        case DELETE_PLANT_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                deletingPlant: false,
                plants: action.payload
            }
        default:
        return state;
    }
}