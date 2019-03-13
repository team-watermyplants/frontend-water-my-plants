import {
    UPDATE_IN_PROGRESS, 
    UPDATE_PLANT_SUCCESS,
    UPDATE_PLANT_FAILURE
} from '../actions/updateActions';

const initialState = {
    updatingPlant: false,
    activePlant: null,
    error: null,
    plants: []
}

export const updateReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_IN_PROGRESS:
            return {
                ...state,
                updatingPlant: true,
            }
        case UPDATE_PLANT_SUCCESS:
            return {
                ...state,
                updatingPlant: false,
                plants: action.payload
            }
        case UPDATE_PLANT_FAILURE:
            return {
                ...state,
                updatingPlant: false,
                error: action.payload
            }
        default:
        return state;
    }
}