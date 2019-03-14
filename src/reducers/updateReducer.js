import {
    UPDATE_IN_PROGRESS, 
    UPDATE_PLANT_SUCCESS,
    UPDATE_PLANT_FAILURE,
    CREATE_UPDATE_FORM,
    CANCEL_UPDATE
} from '../actions/updateActions';

const initialState = {
    updatingPlant: false,
    activePlant: null,
    error: null,
    plants: []
}

export const updateReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_UPDATE_FORM:
        return{
            ...state,
            activePlant: action.payload
        }
        case UPDATE_IN_PROGRESS:
            return {
                ...state,
                updatingPlant: true,
            }
        case UPDATE_PLANT_SUCCESS:
            return {
                ...state,
                updatingPlant: false,
                plants: action.payload,
                activePlant: null
            }
        case UPDATE_PLANT_FAILURE:
            return {
                ...state,
                updatingPlant: false,
                error: action.payload
            }
            case CANCEL_UPDATE:
            return{
                ...state,
                activePlant: null
            }
        default:
        return state;
    }
}