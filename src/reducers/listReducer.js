import { REQUEST_IN_PROGRESS, PLANT_REQUEST_SUCCESS } from '../actions'

const initialState = {
    communicating: false,
    plants: []
}

export const listReducer = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_IN_PROGRESS:
        return {
            ...state,
            communicating: true
        }
            case PLANT_REQUEST_SUCCESS:
            return {
                ...state,
                communicating: false,
                plants: action.payload
            }
        default:
        return state 
    }
}